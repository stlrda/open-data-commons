// reference: https://www.w3.org/TR/clipboard-apis/

class Clipboard {

  copyText(text: string, querySelector: string) {
    navigator.clipboard.readText().then(clipText => {
      //@ts-ignore
      document.querySelector(querySelector)!.innerText += clipText;
    })
  }

  copyCells(textToPaste: string = "Example Paste") {
    const copyEvent = new ClipboardEvent('copy')
    const addedData = copyEvent.clipboardData?.items.add(textToPaste, "text/plain")
    console.log('data:', addedData)
    document.dispatchEvent(copyEvent)
  }

  cutCells() {
    const cutEvent = new ClipboardEvent('cut')
    // do something with cutEvent

    document.dispatchEvent(cutEvent)
  }

  pasteCells() {
    const pasteEvent = new ClipboardEvent('paste')
    const data = pasteEvent.clipboardData?.getData("text/plain")
    console.log('data:', data)
    document.dispatchEvent(pasteEvent)
  }

  // Listener Examples
  copyListener() {
    document.addEventListener('copy', (event) => {
      // event.clipboardData is initially empty
      event.clipboardData!.setData('text/plain', 'Copied Text Example')
      // prevents the document selection from being written to clipboard
      event.preventDefault();
    })
  }

  async readTextFromClipboard() {
    const text = await navigator.clipboard.readText(); // or read() for other types
    console.log('text from blob:', text)
  }
}

export default Clipboard
