export interface Translations {
  // Navigation
  attendance: string;
  manage: string;
  history: string;
  analytics: string;
  
  // Common
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  confirm: string;
  loading: string;
  
  // Attendance Page
  attendanceTracker: string;
  markAttendance: string;
  markAttendanceDesc: string;
  summary: string;
  selectionsMade: string;
  totalPossible: string;
  saveAttendance: string;
  saving: string;
  attendanceSaved: string;
  setupRequired: string;
  setupRequiredDesc: string;
  goToManagement: string;
  
  // Management Page
  manageData: string;
  addEditDelete: string;
  people: string;
  items: string;
  addNewPerson: string;
  addNewItem: string;
  enterPersonName: string;
  enterItemName: string;
  noPeopleYet: string;
  noItemsYet: string;
  addFirstPerson: string;
  addFirstItem: string;
  deletePerson: string;
  deleteItem: string;
  deletePersonConfirm: string;
  deleteItemConfirm: string;
  
  // History Page
  attendanceHistory: string;
  viewPastRecords: string;
  filterByDate: string;
  allDates: string;
  noHistoryYet: string;
  startTracking: string;
  records: string;
  attendanceRecords: string;
  noRecordsSession: string;
  noSessionsFound: string;
  viewDetails: string;
  hideDetails: string;
  
  // Analytics Page
  analyticsReports: string;
  statisticsInsights: string;
  totalSessions: string;
  totalRecords: string;
  avgPerSession: string;
  activePeople: string;
  keyInsights: string;
  mostPopular: string;
  needsAttention: string;
  itemStatistics: string;
  frequencyPopularity: string;
  times: string;
  selectedIn: string;
  outOf: string;
  sessions: string;
  performanceOverview: string;
  activeItems: string;
  avgParticipation: string;
  noAnalyticsYet: string;
  trackAttendanceFirst: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Navigation
    attendance: 'Attendance',
    manage: 'Manage',
    history: 'History',
    analytics: 'Analytics',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    confirm: 'Confirm',
    loading: 'Loading...',
    
    // Attendance Page
    attendanceTracker: 'Attendance Tracker',
    markAttendance: 'Mark Attendance',
    markAttendanceDesc: 'Tap the checkboxes to mark attendance for each person and item combination.',
    summary: 'Summary',
    selectionsMade: 'selections made',
    totalPossible: 'total possible',
    saveAttendance: 'Save Attendance',
    saving: 'Saving...',
    attendanceSaved: 'Attendance saved successfully!',
    setupRequired: 'Setup Required',
    setupRequiredDesc: 'You need to add both people and items before you can track attendance.',
    goToManagement: 'Go to the Management tab to add people and items.',
    
    // Management Page
    manageData: 'Manage Data',
    addEditDelete: 'Add, edit, and delete people and items',
    people: 'People',
    items: 'Items',
    addNewPerson: 'Add New Person',
    addNewItem: 'Add New Item',
    enterPersonName: "Enter person's name",
    enterItemName: 'Enter item name',
    noPeopleYet: 'No people added yet.',
    noItemsYet: 'No items added yet.',
    addFirstPerson: 'Add your first person above.',
    addFirstItem: 'Add your first item above.',
    deletePerson: 'Delete Person',
    deleteItem: 'Delete Item',
    deletePersonConfirm: 'Are you sure you want to delete "{name}"? This will also remove all their attendance records.',
    deleteItemConfirm: 'Are you sure you want to delete "{name}"? This will also remove all related attendance records.',
    
    // History Page
    attendanceHistory: 'Attendance History',
    viewPastRecords: 'View past attendance records',
    filterByDate: 'Filter by Date',
    allDates: 'All dates',
    noHistoryYet: 'No History Yet',
    startTracking: 'Start tracking attendance to see your history here.',
    records: 'records',
    attendanceRecords: 'Attendance Records',
    noRecordsSession: 'No attendance records for this session.',
    noSessionsFound: 'No Sessions Found',
    viewDetails: 'View Details',
    hideDetails: 'Hide Details',
    
    // Analytics Page
    analyticsReports: 'Analytics & Reports',
    statisticsInsights: 'Statistics and insights',
    totalSessions: 'Total Sessions',
    totalRecords: 'Total Records',
    avgPerSession: 'Avg per Session',
    activePeople: 'Active People',
    keyInsights: 'Key Insights',
    mostPopular: 'is the most popular with',
    needsAttention: 'needs attention with only',
    itemStatistics: 'Item Statistics',
    frequencyPopularity: 'Frequency and popularity of each item across all sessions',
    times: 'times',
    selectedIn: 'Selected in',
    outOf: 'out of',
    sessions: 'sessions',
    performanceOverview: 'Performance Overview',
    activeItems: 'Active Items',
    avgParticipation: 'Avg Participation',
    noAnalyticsYet: 'No Analytics Yet',
    trackAttendanceFirst: 'Track some attendance to see analytics and statistics here.',
  },
  
  zh: {
    // Navigation
    attendance: '出席',
    manage: '管理',
    history: '历史',
    analytics: '分析',
    
    // Common
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    confirm: '确认',
    loading: '加载中...',
    
    // Attendance Page
    attendanceTracker: '出席跟踪器',
    markAttendance: '标记出席',
    markAttendanceDesc: '点击复选框为每个人员和项目组合标记出席。',
    summary: '摘要',
    selectionsMade: '已选择',
    totalPossible: '总可能',
    saveAttendance: '保存出席',
    saving: '保存中...',
    attendanceSaved: '出席记录保存成功！',
    setupRequired: '需要设置',
    setupRequiredDesc: '您需要添加人员和项目才能跟踪出席情况。',
    goToManagement: '转到管理选项卡添加人员和项目。',
    
    // Management Page
    manageData: '管理数据',
    addEditDelete: '添加、编辑和删除人员和项目',
    people: '人员',
    items: '项目',
    addNewPerson: '添加新人员',
    addNewItem: '添加新项目',
    enterPersonName: '输入人员姓名',
    enterItemName: '输入项目名称',
    noPeopleYet: '尚未添加人员。',
    noItemsYet: '尚未添加项目。',
    addFirstPerson: '在上方添加您的第一个人员。',
    addFirstItem: '在上方添加您的第一个项目。',
    deletePerson: '删除人员',
    deleteItem: '删除项目',
    deletePersonConfirm: '您确定要删除"{name}"吗？这也将删除他们的所有出席记录。',
    deleteItemConfirm: '您确定要删除"{name}"吗？这也将删除所有相关的出席记录。',
    
    // History Page
    attendanceHistory: '出席历史',
    viewPastRecords: '查看过去的出席记录',
    filterByDate: '按日期筛选',
    allDates: '所有日期',
    noHistoryYet: '暂无历史记录',
    startTracking: '开始跟踪出席以在此处查看您的历史记录。',
    records: '记录',
    attendanceRecords: '出席记录',
    noRecordsSession: '此会话没有出席记录。',
    noSessionsFound: '未找到会话',
    viewDetails: '查看详情',
    hideDetails: '隐藏详情',
    
    // Analytics Page
    analyticsReports: '分析与报告',
    statisticsInsights: '统计和见解',
    totalSessions: '总会话数',
    totalRecords: '总记录数',
    avgPerSession: '每会话平均',
    activePeople: '活跃人员',
    keyInsights: '关键见解',
    mostPopular: '最受欢迎，有',
    needsAttention: '需要关注，只有',
    itemStatistics: '项目统计',
    frequencyPopularity: '所有会话中每个项目的频率和受欢迎程度',
    times: '次',
    selectedIn: '在',
    outOf: '中的',
    sessions: '会话中被选择',
    performanceOverview: '性能概览',
    activeItems: '活跃项目',
    avgParticipation: '平均参与度',
    noAnalyticsYet: '暂无分析',
    trackAttendanceFirst: '跟踪一些出席情况以在此处查看分析和统计。',
  },
  
  ms: {
    // Navigation
    attendance: 'Kehadiran',
    manage: 'Urus',
    history: 'Sejarah',
    analytics: 'Analitik',
    
    // Common
    save: 'Simpan',
    cancel: 'Batal',
    delete: 'Padam',
    edit: 'Edit',
    add: 'Tambah',
    confirm: 'Sahkan',
    loading: 'Memuatkan...',
    
    // Attendance Page
    attendanceTracker: 'Penjejak Kehadiran',
    markAttendance: 'Tandakan Kehadiran',
    markAttendanceDesc: 'Ketik kotak semak untuk menandakan kehadiran bagi setiap kombinasi orang dan item.',
    summary: 'Ringkasan',
    selectionsMade: 'pilihan dibuat',
    totalPossible: 'jumlah kemungkinan',
    saveAttendance: 'Simpan Kehadiran',
    saving: 'Menyimpan...',
    attendanceSaved: 'Kehadiran berjaya disimpan!',
    setupRequired: 'Persediaan Diperlukan',
    setupRequiredDesc: 'Anda perlu menambah orang dan item sebelum boleh menjejak kehadiran.',
    goToManagement: 'Pergi ke tab Pengurusan untuk menambah orang dan item.',
    
    // Management Page
    manageData: 'Urus Data',
    addEditDelete: 'Tambah, edit, dan padam orang dan item',
    people: 'Orang',
    items: 'Item',
    addNewPerson: 'Tambah Orang Baru',
    addNewItem: 'Tambah Item Baru',
    enterPersonName: 'Masukkan nama orang',
    enterItemName: 'Masukkan nama item',
    noPeopleYet: 'Belum ada orang ditambah.',
    noItemsYet: 'Belum ada item ditambah.',
    addFirstPerson: 'Tambah orang pertama anda di atas.',
    addFirstItem: 'Tambah item pertama anda di atas.',
    deletePerson: 'Padam Orang',
    deleteItem: 'Padam Item',
    deletePersonConfirm: 'Adakah anda pasti mahu memadam "{name}"? Ini juga akan membuang semua rekod kehadiran mereka.',
    deleteItemConfirm: 'Adakah anda pasti mahu memadam "{name}"? Ini juga akan membuang semua rekod kehadiran berkaitan.',
    
    // History Page
    attendanceHistory: 'Sejarah Kehadiran',
    viewPastRecords: 'Lihat rekod kehadiran lepas',
    filterByDate: 'Tapis mengikut Tarikh',
    allDates: 'Semua tarikh',
    noHistoryYet: 'Belum Ada Sejarah',
    startTracking: 'Mula jejak kehadiran untuk melihat sejarah anda di sini.',
    records: 'rekod',
    attendanceRecords: 'Rekod Kehadiran',
    noRecordsSession: 'Tiada rekod kehadiran untuk sesi ini.',
    noSessionsFound: 'Tiada Sesi Dijumpai',
    viewDetails: 'Lihat Butiran',
    hideDetails: 'Sembunyikan Butiran',
    
    // Analytics Page
    analyticsReports: 'Analitik & Laporan',
    statisticsInsights: 'Statistik dan pandangan',
    totalSessions: 'Jumlah Sesi',
    totalRecords: 'Jumlah Rekod',
    avgPerSession: 'Purata setiap Sesi',
    activePeople: 'Orang Aktif',
    keyInsights: 'Pandangan Utama',
    mostPopular: 'adalah yang paling popular dengan',
    needsAttention: 'memerlukan perhatian dengan hanya',
    itemStatistics: 'Statistik Item',
    frequencyPopularity: 'Kekerapan dan populariti setiap item merentas semua sesi',
    times: 'kali',
    selectedIn: 'Dipilih dalam',
    outOf: 'daripada',
    sessions: 'sesi',
    performanceOverview: 'Gambaran Prestasi',
    activeItems: 'Item Aktif',
    avgParticipation: 'Purata Penyertaan',
    noAnalyticsYet: 'Belum Ada Analitik',
    trackAttendanceFirst: 'Jejak beberapa kehadiran untuk melihat analitik dan statistik di sini.',
  },
};

export type Language = 'en' | 'zh' | 'ms';

export const useTranslation = (language: Language = 'en') => {
  const t = (key: keyof Translations, params?: Record<string, string>): string => {
    let text = translations[language][key] || translations.en[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, value);
      });
    }
    
    return text;
  };

  return { t };
};