export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  graphqlUrl: 'http://localhost:3000/graphql',
  socketUrl: 'http://localhost:3000',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es', 'fr'],
  version: '1.0.0',
  appName: 'Enterprise EMS',
  companyName: 'Your Company Name',
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