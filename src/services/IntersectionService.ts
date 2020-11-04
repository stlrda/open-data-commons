

// class IntersectionService {
//   targetId?: string;
//   parentId?: string;
//   threshold?: number[];
//   containerElem?: any;
//   // observerOptions?: any;
//   // observer: any

//   constructor(targetId: string, parentId: string, threshold: number[] = [0.2]) {
//     this.targetId = targetId;
//     this.parentId = parentId;
//     this.threshold = threshold;
//   }

//   startObserver() {
//     try {
//       if(!this.targetId) throw new Error("Target Id is undefined")
//       const targetElement = document.getElementById(this.targetId)
//       if(!targetElement) throw new Error("Target Element is undefined")
//       let options: any = {
//         threshold: this.threshold,
//       };
//       if(this.parentId) {
//         const rootElement = document.getElementById(this.parentId)
//         if(rootElement) {
//           options.root = rootElement;
//           console.log('root element id:', this.parentId)
//         }
//       }
//       console.log('options:', options)
//       const observer = new IntersectionObserver(function(entries) {
//         console.log('observer entries:', entries)
//       }, options)
//       observer.observe(targetElement)
//       this.containerElem = targetElement;
//     } catch (error) {
//       console.log('error starting observer:', error)
//     }
//   }

//   cleanupObserver() {
//     // remove observer instance / remove any listeners / reset class properties
//   }
// }

// export default IntersectionService
