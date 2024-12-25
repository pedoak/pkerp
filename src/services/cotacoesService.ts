interface Cotacao {
  valor: number;
  variacao: number;
  ultimaAtualizacao: Date;
}

interface BCBCotacao {
  value: Array<{
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: string;
  }>;
}

interface Cache<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

class CotacoesCache {
  private static instance: CotacoesCache;
  private cache: Map<string, Cache<any>>;
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutos em milissegundos

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): CotacoesCache {
    if (!CotacoesCache.instance) {
      CotacoesCache.instance = new CotacoesCache();
    }
    return CotacoesCache.instance;
  }

  set(key: string, data: any, expiresIn: number = this.CACHE_DURATION): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn
    });
  }

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cached.expiresIn;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }
}

const cotacoesCache = CotacoesCache.getInstance();

export const cotacoesService = {
  async buscarCotacaoDolarData(data: string): Promise<BCBCotacao> {
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$format=json`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao buscar cotação do dólar');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar cotação do dólar:', error);
      throw error;
    }
  },

  async buscarCotacaoPetroleo(): Promise<number> {
    try {
      // API do EIA (Energy Information Administration)
      // Requer API key: https://www.eia.gov/opendata/
      const response = await fetch('https://api.eia.gov/series/?api_key=YOUR_API_KEY&series_id=PET.RWTC.D');
      const data = await response.json();
      return data.series[0].data[0][1]; // Último preço disponível
    } catch (error) {
      console.error('Erro ao buscar cotação do petróleo:', error);
      return 75.50; // Valor default
    }
  },

  async buscarCotacaoNafta(): Promise<number> {
    try {
      // Exemplo usando API do Platts ou similar
      // const response = await fetch('URL_DA_API_NAFTA');
      // const data = await response.json();
      // return data.price;
      return 685.00; // Valor default por enquanto
    } catch (error) {
      console.error('Erro ao buscar cotação da nafta:', error);
      return 685.00;
    }
  },

  calcularVariacao(atual: number, anterior: number): number {
    if (!anterior) return 0;
    return Number(((atual - anterior) / anterior * 100).toFixed(2));
  },

  async buscarCotacoes(): Promise<{ dolar: Cotacao; nafta: Cotacao; petroleo: Cotacao }> {
    try {
      // Verifica cache
      const cachedData = cotacoesCache.get<{ dolar: Cotacao; nafta: Cotacao; petroleo: Cotacao }>('cotacoes');
      if (cachedData) {
        return cachedData;
      }

      // Datas para cotação do dólar
      const hoje = new Date();
      const ontem = new Date(hoje);
      ontem.setDate(ontem.getDate() - 1);
      
      const formatarData = (data: Date) => data.toISOString().split('T')[0];
      const hojeFormatado = formatarData(hoje);
      const ontemFormatado = formatarData(ontem);

      // Busca cotações do dólar
      let dolarAtual = 6.19;
      let dolarAnterior = 6.19;
      let dolarVariacao = 0;

      try {
        const [cotacaoHoje, cotacaoOntem] = await Promise.all([
          this.buscarCotacaoDolarData(hojeFormatado),
          this.buscarCotacaoDolarData(ontemFormatado)
        ]);

        if (cotacaoHoje.value.length > 0) {
          dolarAtual = (cotacaoHoje.value[0].cotacaoCompra + cotacaoHoje.value[0].cotacaoVenda) / 2;
        }

        if (cotacaoOntem.value.length > 0) {
          dolarAnterior = (cotacaoOntem.value[0].cotacaoCompra + cotacaoOntem.value[0].cotacaoVenda) / 2;
        }

        dolarVariacao = this.calcularVariacao(dolarAtual, dolarAnterior);
      } catch (error) {
        console.error('Erro ao buscar cotações do dólar, usando valores default:', error);
      }

      // Busca outras cotações em paralelo
      const [petroleoValor, naftaValor] = await Promise.all([
        this.buscarCotacaoPetroleo(),
        this.buscarCotacaoNafta()
      ]);

      const resultado = {
        dolar: {
          valor: Number(dolarAtual.toFixed(4)),
          variacao: dolarVariacao,
          ultimaAtualizacao: new Date()
        },
        nafta: {
          valor: naftaValor,
          variacao: 0.15, // TODO: Implementar variação quando tivermos API
          ultimaAtualizacao: new Date()
        },
        petroleo: {
          valor: petroleoValor,
          variacao: -0.42, // TODO: Implementar variação quando tivermos API
          ultimaAtualizacao: new Date()
        }
      };

      // Salva no cache
      cotacoesCache.set('cotacoes', resultado);

      return resultado;
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
      throw error;
    }
  }
};
