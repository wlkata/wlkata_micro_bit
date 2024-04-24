//% color="#FFA500" weight=20 icon="\uf287"
namespace wlkata {
    let writeLinePadding = 32;
    export let NEW_LINE = "\r\n";
    export let NEW_LINE_DELIMITER: Delimiters = Delimiters.NewLine;

    const enum Delimiters {
        //% block="new line (\n)"
        NewLine = 10,
        //% block=","
        Comma = 44,
        //% block="$"
        Dollar = 36,
        //% block=":"
        Colon = 58,
        //% block="."
        Fullstop = 46,
        //% block="#"
        Hash = 35,
        //% block="carriage return (\r)"
        CarriageReturn = 13,
        //% block="space"
        Space = 32,
        //% block="tab (\t)"
        Tab = 9,
        //% block="|"
        Pipe = 124,
        //% block=";"
        SemiColon = 59,
    }
    export enum MyEnum {
        //% blockId="P0" block="P0"
        P0,
        //% blockId="P1" block="P1"
        P1,
        //% blockId="P2" block="P2"
        P2,
        //% blockId="P8" block="P8"
        P8,
        //% blockId="P12" block="P12"
        P12,
        //% blockId="P13" block="P13"
        P13,
        //% blockId="P14" block="P14"
        P14,
        //% blockId="P15" block="P15"
        P15,
        //% blockId="P16" block="P16"
        P16

    }
    export enum POSE1 {
        //% blockId="MOVEP"  block="MOVEP"
        MOVEP,
        //% blockId="MOVEL" block="MOVEL"
        MOVEL,
        //% blockId="JUMP" block="JUMP"
        JUMP
    }
    export enum POSE2 {
        //% blockId="ABS" block="ABS"
        ABS,
        //% blockId="INC" block="INC"
        INC
    }
    export enum POSE3 {
        //%blockId="halt" block="halt"
        Halt,
        //%blockId="go" block="go"
        Go
    }
    export enum POSE4 {
        //%blockId="OPEN" block="OPEN"
        OPEN,
        //%blockId="CLOSE" block="CLOSE"
        CLOSE,
        //%blockId="OFF" block="OFF"
        OFF
    }
    export enum POSE5 {
        //%blockId="breathe_in" block="breathe_in"
        breathe_in,
        //%blockId="blackout" block="blackout"
        blackout

    }
    export enum POSE6 {
        //%blockId="breathe_in" block="breathe_in"
        breathe_in,
        //%blockId="breathe_out" block="breathe_out"
        breathe_out,
        //%blockId="blackout" block="blackout"
        blackout


    }
    function E4_movePose_serial(a1: string, a2: string, a3: number, a4: number, a5: number, a6: number, a7: number): void {

        let a = "M20 " + a2 + " " + a1 + " X" + a3 + " Y" + a4 + " Z" + a5 + " A" + a6 + " B" + a7 + " F2000";
        E4_sendMsg(a);


    }
    function E4_moveJoints_serial(a1: string, a2: number, a3: number, a4: number, a5: number): void {
        let a = "M21 " + a1 + " G00 X" + a2 + " Y" + a3 + " Z" + a4 + " A" + a5 + " F2000";
        E4_sendMsg(a);



    }

    function delimiters(del: Delimiters): string {
        return String.fromCharCode(del as number);
    }
    //% weight=100 blockGap=8
    //%blockId=E4_uart block="E4 Robot UART Setup|TX: %XT|RX: %RX"   
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //%TX.defl=SerialPin.P0 RX.defl=SerialPin.P1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_uart(TX: SerialPin, RX: SerialPin): void {
        serial.redirect(
            TX,
            RX,
            BaudRate.BaudRate115200
        );
    }
    //% weight=99 blockGap=8
    //%blockId=E4_senMed block="E4 Robot Arm Telegram Sender|Send %text"
    //%text.defl="o100"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_sendMsg(text: string): void {
        if (!text) text = "";
        serial.writeString(text);
        if (writeLinePadding > 0) {
            let r = (writeLinePadding - (text.length + NEW_LINE.length) % writeLinePadding) % writeLinePadding;
            for (let i = 0; i < r; ++i)
                serial.writeString(" ");
        }
        serial.writeString("\r\n");
    }

    //% weight=98
    //% blockId=E4_homing block="E4 Robot Arm Homing"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_homing(): void {
        E4_sendMsg("$h");

    }
    //% weight=97
    //% blockId=E4_reset block="E4 Robot Arm Reset"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_reset(): void {
        E4_sendMsg("o100");

    }

    //% weight=96
    //% blockId=E4_zero block="E4 Robot Arm Zero Position"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_zero(): void {
        E4_sendMsg("M21 G90 G00 X0 Y0 Z0 A0 B0 C0 F2000");

    }

    //% weight=95
    //% blockId=E4_runFile block="E4 Robot Arm Execute G-code Offline File|%file"
    //% file.defl="tese.gcode"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_runFile(file: string): void {
        E4_sendMsg("O111=" + file);

    }



    //% weight=94
    //% blockId=E4_movePose block="E4 Robot Arm Cartesian Movement|%a1|%a2|X: %a3|Y: %a4|Z: %a5|A: %a6|D: %a7"
    //% a3.defl=192 a4.defl=0 a5.defl=230 a6.defl=0 a7.defl=0
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_movePose(a1: POSE1, a2: POSE2, a3: number, a4: number, a5: number, a6: number, a7: number): void {
        let name_a1 = "";
        let name_a2 = "";
        switch (a1) {
            case POSE1.MOVEP:
                name_a1 = "G00";
                break;
            case POSE1.MOVEL:
                name_a1 = "G01";
                break;
            case POSE1.JUMP:
                name_a1 = "G05";
                break;
        }
        switch (a2) {
            case POSE2.ABS:
                name_a2 = "G90";
                break;
            case POSE2.INC:
                name_a2 = "G91";
                break;
        }
        E4_movePose_serial(name_a1, name_a2, a3, a4, a5, a6, a7);

    }


    //% weight=93
    //% blockId=E4_moveJoints block="E4 Robot Arm Joint Movement|%a1|J1:%a2|J2:%a3|J3:%a4|J4:%a5"  
    //% a2.defl = 0 a3.defl = 0 a4.defl = 0 a5.defl = 0
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_moveJoints(a1: POSE2, a2: number, a3: number, a4: number, a5: number): void {
        let name_a1 = "";
        switch (a1) {
            case POSE2.ABS:
                name_a1 = "G90";
                break;
            case POSE2.INC:
                name_a1 = "G91";
                break;
        }
        E4_moveJoints_serial(name_a1, a2, a3, a4, a5);
    }

    //% weight=92
    //% blockId=E4_movePause block="E4 Robot Arm|%a1 Movement"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_movePause(a1: POSE3): void {
        switch (a1) {
            case POSE3.Halt:
                E4_sendMsg("!")
                break;
            case POSE3.Go:
                E4_sendMsg("~")
                break;
        }

    }
    //% weight=91
    //% blockId=E4_moveExjDist block="E4 Robot Arm 7th Axis|%a1 Mode |Move %a2 Distance"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_moveExjDist(a1: POSE2, a2: number): void {
        let name_a1 = "";
        switch (a1) {
            case POSE2.ABS:
                name_a1 = "G90";
                break;
            case POSE2.INC:
                name_a1 = "G91";
                break;

        }
        E4_sendMsg(name_a1 + " D" + a2)
    }
    //% weight=90
    //% blockId=E4_setEndtGripper block="E4 Robot Arm Electric Gripper|%a1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_setEndtGripper(a1: POSE4): void {
        switch (a1) {
            case POSE4.OPEN:
                E4_sendMsg("M3 S40")
                break;
            case POSE4.CLOSE:
                E4_sendMsg("M3 S60")
                break;
            case POSE4.OFF:
                E4_sendMsg("M3 S0")
                break;
        }

    }
    //% weight=89
    //% blockId=E4_setEndtPump block="E4 Robot Arm Vacuum Suction Cup|%a1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_setEndtPump(a1: POSE5): void {

        switch (a1) {
            case POSE5.breathe_in:
                E4_sendMsg("M3 S1000")

                break;
            case POSE5.blackout:
                E4_sendMsg("M3 S0")

                break;
        }

    }
    //% weight=88
    //% blockId=E4_setEndtPump1 block="E4 Robot Arm Three-finger Soft Gripper|%a1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_setEndtPump1(a1: POSE6): void {
        switch (a1) {
            case POSE6.breathe_in:
                E4_sendMsg("M3 S1000")

                break;
            case POSE6.blackout:
                E4_sendMsg("M3 S0")

                break;
            case POSE6.breathe_out:
                E4_sendMsg("M3 S500")
                break;
        }

    }
    //% weight=87
    //% blockId=E4_getState block="E4 Robot Arm State"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function E4_getState(): string {
        let name_state = "";
        E4_sendMsg("O103");
        name_state = serial.readUntil(delimiters(NEW_LINE_DELIMITER));
        if (name_state.includes("Idle"))
            return "Idle";
        else if (name_state.includes("Run"))
            return "Run";
        else if (name_state.includes("Offline"))
            return "Offline";
        else if (name_state.includes("Alarm"))
            return "Alarm";
        else if (name_state.includes("Home"))
            return "Home";
        else if (name_state.includes("Hold"))
            return "Hold";
        else
            return "Error";

    }
}