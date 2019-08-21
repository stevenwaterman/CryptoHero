import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'InstrumentCard': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'InstrumentCardGrid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}