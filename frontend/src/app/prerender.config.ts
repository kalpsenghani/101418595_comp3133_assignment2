export function getPrerenderParams(route: string): { params: Record<string, string> }[] {
  // For the edit route, return an empty array to skip prerendering
  if (route === 'employees/edit/:id') {
    return [];
  }
  return [];
} 