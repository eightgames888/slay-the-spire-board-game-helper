declare namespace IndexModuleScssNamespace {
  export interface IIndexModuleScss {
    container: string;
    grid: string;
  }
}

declare const IndexModuleScssModule: IndexModuleScssNamespace.IIndexModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexModuleScssNamespace.IIndexModuleScss;
};

export = IndexModuleScssModule;
