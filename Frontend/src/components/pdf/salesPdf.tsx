import { Order } from '@customTypes/types';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1 solid #000',
    backgroundColor: '#eee',
    paddingVertical: 5,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '0.5 solid #ccc',
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 2,
  },
  totalBox: {
    marginTop: 20,
    padding: 10,
    border: '1 solid #000',
    alignSelf: 'flex-end',
    width: '40%',
    textAlign: 'right',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

// Componente PDF
export const SalesPdf = ({ data, startDate, endDate } : {data:Order[], startDate: string, endDate: string}) => {
  const total = Array.isArray(data) ? data.reduce((sum, row) => sum + row.total, 0) : 0;


  const columns = [
    'Documento',
    'Fecha',
    'Folio',
    'Cliente',
    'Usuario',
    'Total',
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Reporte General de Ventas</Text>
          <Text style={styles.subtitle}>
            Período: {startDate} - {endDate}
          </Text>
        </View>

        {/* Encabezado de la tabla */}
        <View style={styles.tableHeader}>
          {columns.map((col, i) => (
            <Text key={i} style={styles.cell}>
              {col}
            </Text>
          ))}
        </View>

        {/* Filas de la tabla */}
        {Array.isArray(data) && data.map((row, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.cell}>Ticket</Text>
            <Text style={styles.cell}>{row.order_date?.toString()}</Text>
            <Text style={styles.cell}>{row.id}</Text>
            <Text style={styles.cell}>{row.customer}</Text>
            <Text style={styles.cell}>Administrador</Text>
            <Text style={styles.cell}>${(row.total).toFixed(2)}</Text>
          </View>
        ))}

        {/* Caja de total */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total General: ${total.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};
