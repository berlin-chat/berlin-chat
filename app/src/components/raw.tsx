import * as React from 'react';

interface IRawProps {
    name: string,
}

export default class Raw extends React.Component<IRawProps> {

    constructor( props: IRawProps ) {
        super( props );
    }

    public render() {
        return (
            <div>
                {this.props.name}
            </div>
        );
    }
}
