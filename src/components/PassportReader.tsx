import React, { useState, useRef, useEffect } from 'react'
import {
  Upload,
  Download,
  RotateCw,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle2,
  Trash2,
  PlusCircle,
  FileText
} from 'lucide-react'

export interface PassportData {
  nombre: string
  apellidos: string
  numero_pasaporte: string
  nacionalidad: string
  fecha_nacimiento: string
  fecha_caducidad: string
}

export interface ConfirmedPassport extends PassportData {
  id: string
  archivo_nombre: string
  confirmado_at: string
}

interface Props {
  env?: any
  onNavigate?: (screen: any) => void
}

export const PassportReader: React.FC<Props> = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null)
  const [fileName, setFileName] = useState<string>('')
  
  // Viewer controls
  const [zoom, setZoom] = useState<number>(100)
  const [rotation, setRotation] = useState<number>(0)

  // Loading state
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>('')

  // Form fields
  const [formData, setFormData] = useState<PassportData>({
    nombre: '',
    apellidos: '',
    numero_pasaporte: '',
    nacionalidad: '',
    fecha_nacimiento: '',
    fecha_caducidad: ''
  })

  // Confirmed passports for batch export
  const [confirmedList, setConfirmedList] = useState<ConfirmedPassport[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (fileUrl && fileUrl.startsWith('blob:')) {
        URL.revokeObjectURL(fileUrl)
      }
    }
  }, [fileUrl])

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const processFile = async (selectedFile: File) => {
    if (fileUrl && fileUrl.startsWith('blob:')) {
      URL.revokeObjectURL(fileUrl)
    }

    const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf')
    const isImg = selectedFile.type.startsWith('image/') || /\.(png|jpe?g|webp)$/i.test(selectedFile.name)

    if (!isPdf && !isImg) {
      alert('Por favor selecciona una imagen (PNG, JPG, JPEG) o un archivo PDF.')
      return
    }

    const url = URL.createObjectURL(selectedFile)
    setFileUrl(url)
    setFileType(isPdf ? 'pdf' : 'image')
    setFileName(selectedFile.name)
    setZoom(100)
    setRotation(0)
    setIsProcessing(true)
    setStatusMessage('Enviando a la Inteligencia Artificial y leyendo datos...')

    // Call real n8n workflow through the local Vite proxy
    try {
      const payload = new FormData()
      payload.append('file', selectedFile)

      const authToken = (typeof window !== 'undefined' && sessionStorage.getItem('kip_passport_demo_auth'))
        || 'kip2026'

      const response = await fetch('/api/parse-passport', {
        method: 'POST',
        headers: {
          'X-KIP-Passport-Auth': authToken,
          'Authorization': `Bearer ${authToken}`
        },
        body: payload
      })

      if (response.ok) {
        const json = await response.json()
        const first = Array.isArray(json) ? json[0] : json
        const output = first.output || first
        const data = output.data || {}

        setFormData({
          nombre: data.nombre || '',
          apellidos: data.apellidos || '',
          numero_pasaporte: data.numero_pasaporte || '',
          nacionalidad: data.nacionalidad || '',
          fecha_nacimiento: data.fecha_nacimiento || '',
          fecha_caducidad: data.fecha_caducidad || ''
        })

        setStatusMessage(output.message || 'Datos extraídos correctamente.')
      } else {
        setStatusMessage('No se pudo conectar con el servidor de IA. Puedes introducir los datos manualmente.')
      }
    } catch (err) {
      console.error(err)
      setStatusMessage('Error de conexión con la IA. Puedes rellenar los datos manualmente.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (field: keyof PassportData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Confirm passport into list
  const handleConfirm = () => {
    if (!formData.nombre && !formData.apellidos && !formData.numero_pasaporte) {
      alert('Por favor introduce al menos el nombre o número de pasaporte.')
      return
    }

    const newPassport: ConfirmedPassport = {
      ...formData,
      id: `PASS-${Date.now()}`,
      archivo_nombre: fileName || 'pasaporte',
      confirmado_at: new Date().toLocaleString('es-ES')
    }

    setConfirmedList(prev => [newPassport, ...prev])
    alert(`Pasaporte de ${formData.nombre || 'viajero'} confirmado y guardado.`)
  }

  // Download CSV for Excel
  const handleExportCSV = () => {
    const listToExport = confirmedList.length > 0 
      ? confirmedList 
      : [{
          ...formData,
          id: `PASS-${Date.now()}`,
          archivo_nombre: fileName || 'pasaporte',
          confirmado_at: new Date().toLocaleString('es-ES')
        }]

    if (!listToExport[0].nombre && !listToExport[0].numero_pasaporte) {
      alert('No hay datos para exportar.')
      return
    }

    const BOM = '\uFEFF'
    const headers = [
      'Nombre',
      'Apellidos',
      'Numero_Pasaporte',
      'Nacionalidad',
      'Fecha_Nacimiento',
      'Fecha_Caducidad',
      'Archivo_Origen',
      'Fecha_Procesado'
    ]

    const rows = listToExport.map(item => [
      `"${item.nombre.replace(/"/g, '""')}"`,
      `"${item.apellidos.replace(/"/g, '""')}"`,
      `"${item.numero_pasaporte.replace(/"/g, '""')}"`,
      `"${item.nacionalidad.replace(/"/g, '""')}"`,
      item.fecha_nacimiento,
      item.fecha_caducidad,
      `"${item.archivo_nombre.replace(/"/g, '""')}"`,
      item.confirmado_at
    ])

    const csvContent = BOM + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `pasaportes_kip_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Pruebas KIP
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Escáner de Pasaportes
          </h1>
          <p className="text-sm text-slate-500">
            Sube una foto o PDF de un pasaporte para extraer los datos y exportarlos en Excel.
          </p>
        </div>

        {(formData.nombre || confirmedList.length > 0) && (
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Descargar en Excel / CSV ({confirmedList.length || 1})
          </button>
        )}
      </div>

      {/* Main Upload Box */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="bg-white border-2 border-dashed border-teal-500/40 hover:border-teal-600 bg-teal-50/20 hover:bg-teal-50/40 rounded-2xl p-8 text-center transition cursor-pointer group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition shadow-inner">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">
              Haz clic para seleccionar o arrastra aquí tu pasaporte
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Admite fotos (PNG, JPG, JPEG) o archivos PDF escaneados
            </p>
          </div>
        </div>
      </div>

      {/* Results View: Document Preview + Editable Form */}
      {(fileUrl || isProcessing) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Document Preview (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="truncate max-w-[200px]">📄 {fileName}</span>
              {fileType === 'image' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setZoom(z => Math.max(50, z - 25))}
                    className="p-1 hover:bg-slate-200 rounded text-slate-600"
                    title="Alejar"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono px-1">{zoom}%</span>
                  <button
                    onClick={() => setZoom(z => Math.min(200, z + 25))}
                    className="p-1 hover:bg-slate-200 rounded text-slate-600"
                    title="Acercar"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setRotation(r => (r + 90) % 360)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-600 ml-1"
                    title="Rotar 90º"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-900 flex items-center justify-center min-h-[380px] max-h-[500px] overflow-auto relative">
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white z-10 gap-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-teal-400" />
                  <p className="text-sm font-bold tracking-wide">
                    Extrayendo datos del pasaporte con IA...
                  </p>
                  <span className="text-xs text-slate-400">
                    Procesando nombre, pasaporte, fechas y campos
                  </span>
                </div>
              )}

              {fileUrl && (
                fileType === 'pdf' ? (
                  <iframe
                    src={`${fileUrl}#toolbar=0`}
                    title="Vista previa de pasaporte PDF"
                    className="w-full h-[450px] border-0 rounded bg-white shadow"
                  />
                ) : (
                  <img
                    src={fileUrl}
                    alt="Pasaporte subido"
                    style={{
                      transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                      transition: 'transform 0.2s ease-in-out'
                    }}
                    className="max-h-[440px] object-contain rounded shadow"
                  />
                )
              )}
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                Datos Extraídos
              </h2>
              {statusMessage && (
                <span className="text-xs text-slate-500 font-medium">
                  {statusMessage}
                </span>
              )}
            </div>

            {/* The 6 inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Nombre"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Apellidos</label>
                <input
                  type="text"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  placeholder="Apellidos"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Número de Pasaporte</label>
                <input
                  type="text"
                  value={formData.numero_pasaporte}
                  onChange={(e) => handleInputChange('numero_pasaporte', e.target.value.toUpperCase())}
                  placeholder="Número de Pasaporte"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono font-bold tracking-wider focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nacionalidad</label>
                <input
                  type="text"
                  value={formData.nacionalidad}
                  onChange={(e) => handleInputChange('nacionalidad', e.target.value.toUpperCase())}
                  placeholder="Ej. ESP"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Fecha de Nacimiento</label>
                <input
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={(e) => handleInputChange('fecha_nacimiento', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Fecha de Caducidad</label>
                <input
                  type="date"
                  value={formData.fecha_caducidad}
                  onChange={(e) => handleInputChange('fecha_caducidad', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleConfirm}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow transition"
              >
                <PlusCircle className="w-4 h-4" />
                Confirmar y Guardar en Lista
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow transition"
              >
                <Download className="w-4 h-4" />
                Descargar en Excel (CSV)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmed Passports List */}
      {confirmedList.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Pasaportes Confirmados ({confirmedList.length})
            </h3>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition"
            >
              Exportar Todo a Excel
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Pasajero</th>
                  <th className="py-2.5 px-3">Nº Pasaporte</th>
                  <th className="py-2.5 px-3">Nacionalidad</th>
                  <th className="py-2.5 px-3">F. Nacimiento</th>
                  <th className="py-2.5 px-3">F. Caducidad</th>
                  <th className="py-2.5 px-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {confirmedList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {item.nombre} {item.apellidos}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                      {item.numero_pasaporte}
                    </td>
                    <td className="py-2.5 px-3 font-medium">
                      {item.nacionalidad}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {item.fecha_nacimiento}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {item.fecha_caducidad}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => setConfirmedList(prev => prev.filter(p => p.id !== item.id))}
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PassportReader
