export interface Person {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Item {
  id: string;
  name: string;
  createdAt: Date;
}

export interface AttendanceRecord {
  id: string;
  personId: string;
  itemId: string;
  timestamp: Date;
}

export interface AttendanceSession {
  id: string;
  date: Date;
  records: AttendanceRecord[];
}

export interface AttendanceData {
  [personId: string]: {
    [itemId: string]: boolean;
  };
}