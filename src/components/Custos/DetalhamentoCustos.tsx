{/* Previous code remains the same until the cost display section */}
<div className="mt-6 pt-6 border-t border-gray-200">
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
      <span className="text-lg font-semibold">Custo Total:</span>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-2xl font-bold text-green-600">
        R$ {formatCurrency(custos.custoTotal)}
      </span>
      <span className="text-lg font-medium text-gray-700 mt-1">
        R$ {formatCurrency(custos.custoTotal / quantidade)}/kg
      </span>
    </div>
  </div>
</div>