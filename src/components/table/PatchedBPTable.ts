/**
 * A Hacky workaround for slow table scrolling in Firefox
 * credits: https://github.com/palantir/blueprint/issues/1712
 */
import React from 'react'
import { Table, ITableProps, Rect } from "@blueprintjs/table"

export class PatchedTable extends Table {

  constructor(props: ITableProps, context: any) {
      super(props, context);

      // We need to override the original `handleBodyScroll` method with our fixed version.
      (this as any).handleBodyScroll = this._patchedHandleBodyScroll.bind(this);
  }

  // Waiting time between tries
  private readonly WAITING_TIME: number = 40;

  // We need to check sometimes that the component is mounted or not.
  private _ismounted: boolean = false;

  // We need only one running instance to check and update the stored ViewportRect.
  private _lastInProcessEventCame: Date | undefined = undefined;

  public componentDidMount() {
      super.componentDidMount();
      this._ismounted = true;

      // Disabling throttled version of handleWheel and handleMainQuadrantScroll
      // and using handleMainQuadrantScroll instead of handleWheel.
      (this as any).quadrantStackInstance.throttledHandleWheel =
          (this as any).quadrantStackInstance.handleMainQuadrantScroll;

      (this as any).quadrantStackInstance.throttledHandleMainQuadrantScroll =
          (this as any).quadrantStackInstance.handleMainQuadrantScroll;
  }

  public componentWillUnmount() {
      this._ismounted = false;
      super.componentWillUnmount();
  }

  /**
   * We need this promise to delay our tries.
   */
  private readonly _waitingPromise = (value: Rect) => {
      return new Promise<Rect>( (resolve) => setTimeout(() => resolve(value), this.WAITING_TIME) );
  }

  /**
   * We can check the change of the viewportRect and after there is not any other change
   * (the scrolling has been finished) we can update the ViewportRect of the Table.
   */
  private readonly _checkingPromise = async (value: Rect): Promise<Rect> => {
      const viewportRect: Rect = this.locator.getViewportRect();
      const last = this._lastInProcessEventCame;

      if ( this._ismounted && last !== undefined ) {

          if ( Math.abs( new Date().getTime() - last.getTime() ) < this.WAITING_TIME ) {
              // Scrolling is in progress, it hasn't finished yet, so we need to wait a bit...
              return this._waitingPromise( viewportRect ).then( this._checkingPromise );
          } else {
              // Time is OK, we can call the original updateViewportRect method.
              (this as any).updateViewportRect(viewportRect);
          }

      }

      // We can stop the trying now. (No need to wait more.)
      this._lastInProcessEventCame = undefined;
      return value;
  }

  /**
   * Hack to make BluePrintJS table more usable with Firefox.
   * (And to have a bit better performance in other browsers.)
   */
  private _patchedHandleBodyScroll = (event: React.SyntheticEvent<HTMLElement>) => {

      event.stopPropagation();

      if (this.locator != null && !this.state.isLayoutLocked) {

          const initialNextViewportRect = this.locator.getViewportRect();

          // We don't want to start the checking if there is a running instance.
          if ( this._lastInProcessEventCame === undefined ) {
              this._waitingPromise( initialNextViewportRect ).then( this._checkingPromise );
          }

          // We need to refresh the lastInProcessEventCame value every time.
          this._lastInProcessEventCame = new Date();

      }
  }

}
