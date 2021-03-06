import React, { useState } from 'react'
import {Popover} from 'antd';
import _ from 'lodash';
import MarkView from './MarkView';
import MarkPicker from './MarkPicker';
import { assignMark } from 'shared/endpoints';
import { IdIndex } from 'shared/interfaces/Id';

type Props = {
    solutionId: IdIndex,
    mark?: IdIndex,
    onChange: () => void 
}
export default function MarkInput(props: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <Popover
            visible={visible}
            content={
            <MarkPicker 
                onSubmit={(mark: IdIndex | null = null) => {
                    return assignMark(props.solutionId, mark, () => {
                        setVisible(false);
                        props.onChange();
                    });
                }}
            mark={props.mark}/>}
            trigger="click"
            onVisibleChange={setVisible}
        >
            <MarkView mark={props.mark} className="pointer" />
        </Popover>
    )
}