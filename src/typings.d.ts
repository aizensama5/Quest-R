/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module 'd3' { const exportAs: any; export = exportAs; }
