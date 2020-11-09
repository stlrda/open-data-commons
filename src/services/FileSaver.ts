import { saveAs } from 'file-saver'
import { parse } from 'json2csv'

class FileSaverService {

  saveFile(filename: string, rows: any[], cols: any, cb: (error: any) => void) {
    // first extract all of the fields from tableData
    const fields: string[] = Object.keys(cols);
    const options = {fields}

    try {
      const csv = parse(rows, options)
      console.log('csv parsed:', csv)
      const blob = new Blob([csv], {
        type: "text/plain;charset=utf-16;"
      })
      saveAs(blob, filename);
    } catch (error) {
      console.log('there was an error parsing your csv:', error)
      cb(error);
    }
  }
}

export default FileSaverService
