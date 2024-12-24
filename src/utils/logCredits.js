import { primary } from "../components/theme/Themes";

export const logCredits = () => {
    const pieceEmoji = String.fromCodePoint(0x270c);

    const logStyle = [
        `color: ${primary}`,
        "font-size: 3em",
        "font-weight: 300",
        "padding: 10px 0px 100px 0px",
    ].join(";");

    return console.log(
        `%c © ${new Date().getFullYear()} github.com/mshipilov5 ${pieceEmoji}`,
        logStyle
    );
};
