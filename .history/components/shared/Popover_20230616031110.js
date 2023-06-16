import React from 'react';
import * as PP from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';


export const Popover = ({ children, popoverUi }) => {
    return (
       <PP.Root>
           <PP.Trigger asChild>
                {children}
            </PP.Trigger>
           <PP.Portal>
               <PP.Content className="PopoverContent" sideOffset={5}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <p className="Text" style={{ marginBottom: 10 }}>
                            Dimensions
                        </p>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="width">
                                Width
                            </label>
                            <input className="Input" id="width" defaultValue="100%" />
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="maxWidth">
                                Max. width
                            </label>
                            <input className="Input" id="maxWidth" defaultValue="300px" />
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="height">
                                Height
                            </label>
                            <input className="Input" id="height" defaultValue="25px" />
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="maxHeight">
                                Max. height
                            </label>
                            <input className="Input" id="maxHeight" defaultValue="none" />
                        </fieldset>
                    </div>
                   <PP.Close className="PopoverClose" aria-label="Close">
                        <Cross2Icon />
                    </PP.Close>
                   <PP.Arrow className="PopoverArrow" />
                </PP.Content>
            </PP.Portal>
        </PP.Root>
    );

}
