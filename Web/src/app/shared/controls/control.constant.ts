export class ControlConstant {
    public static readonly character = class {
        public static readonly dot: string = '.';
    }

    public static readonly text = class {
        public static readonly noRecordsMsg: string = 'No Records found';
        public static readonly actionColTitle: string = 'Action';
        public static readonly defaultSelectText: string = 'Select';
    }

    public static readonly color = class {
        public static readonly success: string = 'disc-success';
        public static readonly warning: string = 'disc-warning';
        public static readonly danger: string = 'disc-danger';
        public static readonly info: string = 'disc-info';
    }

    
    public static readonly severity = ['High', 'Medium', 'Low'];

}