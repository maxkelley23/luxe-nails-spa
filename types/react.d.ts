declare module 'react' {
  import * as React from '@types/react';
  export = React;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}