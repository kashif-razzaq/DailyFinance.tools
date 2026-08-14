import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 10, color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 30 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #E5E7EB' },
  label: { fontSize: 12, color: '#374151', width: '60%' },
  value: { fontSize: 12, color: '#111827', fontWeight: 'bold', width: '40%', textAlign: 'right' },
})

export const GenericReportPDF = ({ title, data }: { title: string, data: Record<string, unknown>[] }) => {
  // Take the first row of data (since most calculators return a single object array for exports)
  const reportData = data[0] || {}

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.title}>{title}</Text>
        <Text style={pdfStyles.subtitle}>DailyFinance Tools Export</Text>
        <View style={{ marginTop: 20 }}>
          {Object.entries(reportData).map(([key, value]) => (
            <View style={pdfStyles.row} key={key}>
              <Text style={pdfStyles.label}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
              <Text style={pdfStyles.value}>{String(value)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}
