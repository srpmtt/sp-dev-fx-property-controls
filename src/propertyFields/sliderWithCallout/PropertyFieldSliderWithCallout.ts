import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';

import PropertyFieldToggleWithCalloutHost from './PropertyFieldSliderWithCalloutHost';

import {IPropertyFieldSliderWithCalloutPropsInternal, IPropertyFieldSliderWithCalloutProps} from './IPropertyFieldSliderWithCallout';

class PropertyFieldSliderWithCalloutBuilder implements IPropertyPaneField<IPropertyFieldSliderWithCalloutPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldSliderWithCalloutPropsInternal;

    private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

    public constructor(_targetProperty: string, _properties: IPropertyFieldSliderWithCalloutPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

        const props: IPropertyFieldSliderWithCalloutProps = <IPropertyFieldSliderWithCalloutProps>this.properties;

        const element = React.createElement(PropertyFieldToggleWithCalloutHost, {
            ...props,
            onChange: this._onChanged.bind(this)
        });

        ReactDOM.render(element, elem);

        if (changeCallback) {
            this._onChangeCallback = changeCallback;
        }
    }

    private _dispose(elem: HTMLElement) {
        ReactDOM.unmountComponentAtNode(elem);
    }

    private _onChanged(value: number): void {
        if (this._onChangeCallback) {
            this._onChangeCallback(this.targetProperty, value);
        }
    }
}

export function PropertyFieldSliderWithCallout(targetProperty: string, properties: IPropertyFieldSliderWithCalloutProps): IPropertyPaneField<IPropertyFieldSliderWithCalloutPropsInternal> {
    return new PropertyFieldSliderWithCalloutBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}
