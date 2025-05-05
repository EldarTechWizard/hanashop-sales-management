// InventoryReport.js
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import { InventoryMovement } from '@customTypes/types';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    display:"flex",
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    backgroundColor: '#eee',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
});

// Componente que genera el PDF
export const InventoryReportPdf = ({ data, startDate, endDate }: { data:InventoryMovement[], startDate:string, endDate: string}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de movimientos de inventario</Text>
      <Text style={styles.subtitle}>Período: {startDate} - {endDate}</Text>

      <View style={styles.table}>
        {/* Encabezados */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Producto</Text>
          <Text style={styles.tableColHeader}>Tipo de movimiento</Text>
          <Text style={styles.tableColHeader}>Fecha</Text>
          <Text style={styles.tableColHeader}>Referencia</Text>
          <Text style={styles.tableColHeader}>Responsable</Text>
        </View>

        {/* Datos */}
        {Array.isArray(data) && data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{item.product}</Text>
            <Text style={styles.tableCol}>{item.movement_type}</Text>
            <Text style={styles.tableCol}>{item.movement_date?.toString() ?? ""}</Text>
            <Text style={styles.tableCol}>{item.reference}</Text>
            <Text style={styles.tableCol}>Administrador</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
