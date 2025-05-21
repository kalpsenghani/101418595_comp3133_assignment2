export const environment = {
  production: true,
  apiUrl: 'https://stunning-tulumba-f90485.netlify.app/',
  graphqlUrl: 'https://stunning-tulumba-f90485.netlify.app//graphql',
  socketUrl: 'https://stunning-tulumba-f90485.netlify.app/',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es', 'fr'],
  version: '1.0.0',
  appName: 'EMS',
  companyName: 'EmpManSys',
  supportEmail: 'support@yourcompany.com',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100]
  },
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  refreshTokenInterval: 5 * 60 * 1000, // 5 minutes
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'HH:mm:ss',
  currency: 'USD',
  timezone: 'UTC',
  features: {
    enableNotifications: true,
    enableFileUpload: true,
    enableExport: true,
    enableImport: true,
    enableAnalytics: true,
    enableMultiTenant: true,
    enableAuditLogs: true
  }
}; 