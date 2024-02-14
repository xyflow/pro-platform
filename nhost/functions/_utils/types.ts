export type ProExample = {
  files: { path: string; content: string }[];
  timestamp: number;
};

export type ProExampleConfig = {
  framework: string;
  id: string;

  description?: string;
  free?: boolean;
  hidden?: boolean;
  /**
   * Indicates that the example has been served locally from a backend running in
   * development mode, rather than from the live redis cache.
   */
  local?: boolean;
  name?: string;
  /**
   * URL to a live preview of the example that we can embed in an iframe. This is
   * usually somewhere under pro-examples.reactflow.dev but you can also run the
   * pro-example-apps server locally and use the `LOCAL_PRO_EXAMPLES_URL` env var.
   */
  preview: string;
  /**
   * URL to the thumbnail image of the example. This is displayed in the examples
   * grid. If no thumbnail is provided, the frontend will fallback to an empty
   * placeholder image.
   */
  thumbnail?: string;
  variants?: ProExampleVariant[];
};

export type ProExampleVariant = {
  id: string;
  label: string;
};
