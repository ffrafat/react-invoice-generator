import InvoicePage from './components/InvoicePage'
import { Invoice } from './data/types'
import Download from './components/DownloadPDF'
import { useState } from 'react'
import { initialInvoice } from './data/initialData'

function App() {
  const savedInvoice = window.localStorage.getItem('invoiceData')
  let data = null

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice)
    }
  } catch (_e) {}

  const [invoice, setInvoice] = useState<any>(data ? { ...data } : { ...initialInvoice })

  const onInvoiceUpdated = (invoice: Invoice) => {
    window.localStorage.setItem('invoiceData', JSON.stringify(invoice))
    setInvoice(invoice)
  }

  return (
    <div className="app">
      <div className="header">
        <h1 className="center fs-30">React Invoice Generator</h1>
        <div className="top-controls">
          <Download data={invoice} setData={setInvoice} />
        </div>
      </div>
      <InvoicePage data={data} onChange={onInvoiceUpdated} />
    </div>
  )
}

export default App