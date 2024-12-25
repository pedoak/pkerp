# Nome do arquivo de backup
$backupName = "sistemaextrusao_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').zip"

# Criar pasta temporária para o backup
$tempDir = "backup_temp"
New-Item -ItemType Directory -Force -Path $tempDir

# Copiar arquivos importantes
Copy-Item -Path "src" -Destination "$tempDir/src" -Recurse
Copy-Item -Path "public" -Destination "$tempDir/public" -Recurse
Copy-Item -Path "package.json" -Destination "$tempDir/package.json"
Copy-Item -Path "package-lock.json" -Destination "$tempDir/package-lock.json"
Copy-Item -Path "tsconfig.json" -Destination "$tempDir/tsconfig.json"
Copy-Item -Path "vite.config.ts" -Destination "$tempDir/vite.config.ts"
Copy-Item -Path "supabase" -Destination "$tempDir/supabase" -Recurse

# Criar arquivo zip
Compress-Archive -Path "$tempDir/*" -DestinationPath $backupName

# Limpar pasta temporária
Remove-Item -Path $tempDir -Recurse

Write-Host "Backup criado em: $backupName"
