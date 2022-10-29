import React, { useState, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'

export default () => {
  return (
    <div className="ag-theme-alpine" style={{ height: '100vh' }}>
      <GridExample />
    </div>
  )
}

const GridExample = () => {
  const [val, setVal] = useState('GBP')
  const containerStyle = useMemo(() => ({ width: '100vw', height: '100vh' }), [])
  const gridStyle = useMemo(() => ({ height: '100vh', width: '100vw' }), [])

  const columnDefs = [
    { headerName: 'Product', field: 'product' },
    { headerName: 'Currency', field: 'price.currency', filter: 'agTextColumnFilter' },
    {
      headerName: 'Price Local',
      field: 'price',
      cellRenderer: getCurrencyCellRenderer(),
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Report Price',
      field: 'price',
      cellRenderer: getCurrencyCellRenderer(),
      valueGetter: reportingCurrencyValueGetter,
      headerValueGetter: 'ctx.reportingCurrency'
      // equals: (v1, v2) => v1.currency === v2.currency && v1.amount === v2.amount
    }
  ]
  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      flex: 1,
      resizable: true,
      filter: true
    },
    rowData: getData(),
    context: {
      reportingCurrency: 'EUR'
    }
  }

  function reportingCurrencyValueGetter(params) {
    console.log('Param', params)
    var exchangeRates = {
      EUR: {
        GBP: 0.72,
        USD: 1.08
      },
      GBP: {
        EUR: 1.29,
        USD: 1.5
      },
      USD: {
        GBP: 0.67,
        EUR: 0.93
      }
    }

    var price = params.data[params.colDef.field]
    var reportingCurrency = params.context.reportingCurrency
    var fxRateSet = exchangeRates[reportingCurrency]
    var fxRate = fxRateSet[price.currency]
    var priceInReportingCurrency
    if (fxRate) {
      priceInReportingCurrency = price.amount * fxRate
    } else {
      priceInReportingCurrency = price.amount
    }

    var result = {
      currency: reportingCurrency,
      amount: priceInReportingCurrency
    }

    return result
  }

  function getCurrencyCellRenderer() {
    var gbpFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    })
    var eurFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })
    var usdFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    function currencyCellRenderer(params) {
      console.log('rendere', params)
      switch (params.value.currency) {
        case 'EUR':
          return eurFormatter.format(params.value.amount)
        case 'USD':
          return usdFormatter.format(params.value.amount)
        case 'GBP':
          return gbpFormatter.format(params.value.amount)
      }
      return params.value.amount
    }

    return currencyCellRenderer
  }

  function getData() {
    return [
      { product: 'Product 1', price: { currency: 'EUR', amount: 644 } },
      { product: 'Product 2', price: { currency: 'EUR', amount: 354 } },
      { product: 'Product 3', price: { currency: 'GBP', amount: 429 } },
      { product: 'Product 4', price: { currency: 'GBP', amount: 143 } },
      { product: 'Product 5', price: { currency: 'USD', amount: 345 } },
      { product: 'Product 6', price: { currency: 'USD', amount: 982 } }
    ]
  }

  return (
    <>
      <AgGridReact {...gridOptions}></AgGridReact>
    </>
  )
}
