import React from 'react';
import './Text.scss';
interface Props {
    text: string;
    className?: string;
    underline?: boolean;
    green?: boolean;
    ghost?: boolean;
    h1?: boolean;

    fs_32?: boolean;
    fs_24?: boolean;
    fs_14?: boolean;
    fs_12?: boolean;
    fs_10?: boolean;

    fw_xl?: boolean;
    fw_l?: boolean;

    tac?: boolean;

}
const Text: React.FC<Props> = ({
    text,
    className = '',
    underline = false,
    green = false,
    ghost = false,
    h1 = false,
    fs_32 = false,
    fs_24 = false,
    fs_14 = false,
    fs_12 = false,
    fs_10 = false,
    fw_xl = false,
    fw_l = false,
    tac = false
}) => {
    return (
        h1 ? <h1 className={`Text_title ${className}`.trim()}>{text}</h1> 
        : 
        <p className={`Text 
        ${className}
        ${underline && 'Text_underline'}
        ${green && 'Text_c_green'}
        ${ghost && 'Text_c_ghost'}
        ${fs_32 && 'Text_fs_32'}
        ${fs_24 && 'Text_fs_24'}
        ${fs_14 && 'Text_fs_14'}
        ${fs_12 && 'Text_fs_12'}
        ${fs_10 && 'Text_fs_10'}
        ${fw_xl && 'Text_fw_xl'}
        ${fw_l && 'Text_fw_l'}
        ${tac && 'Text_tac'}
        `}>
            {text}
        </p>
    )
};
export default Text
