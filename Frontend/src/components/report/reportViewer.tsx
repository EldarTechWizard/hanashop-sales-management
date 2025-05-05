import { PDFViewer } from '@react-pdf/renderer';
import { ReactElement } from 'react';



const ReportViewer = ({ children }: { children: ReactElement }) => {
    return (
        <div className='h-full'>
            <PDFViewer width="100%" height="550" >
                {children}
            </PDFViewer >
        </div>
    );
};

export default ReportViewer;
