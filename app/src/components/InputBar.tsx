import * as React from 'react';

interface IInputBarProps {
    name: string,
}

export default class InputBar extends React.Component<IInputBarProps> {

    constructor( props: IInputBarProps ) {
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
