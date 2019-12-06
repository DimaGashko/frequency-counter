export default class Events {
   private _handlers: { [key: string]: Function[] } = {};

   addListener(type: string, handler: Function) {
      this._handlers[type] = this._handlers[type] || [];
      this._handlers[type].push(handler);

      return handler;
   }

   removeListener(type: string, handler: Function) {
      if (!this._handlers[type]) return;

      this._handlers[type] = this._handlers[type]
         .filter(item => item != handler);
   }

   emit(type: string, ...args) {
      if (!(type in this._handlers)) return;

      this._handlers[type].forEach((handler) => {
         handler(...args);
      });
   }
}