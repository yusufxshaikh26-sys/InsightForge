export const sampleDataGenerator = {
  generateSalesData: (rows: number = 100) => {
    const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    const data: any[] = []
    for (let i = 0; i < rows; i++) {
      data.push({
        date: months[i % 12],
        product: products[i % products.length],
        units: Math.floor(Math.random() * 500) + 50,
        revenue: Math.floor(Math.random() * 50000) + 5000,
        marketing: Math.floor(Math.random() * 10000) + 1000,
        returns: Math.floor(Math.random() * 50),
      })
    }
    return data
  },

  generateAcademicData: (rows: number = 100) => {
    const fields = ['Engineering', 'Medicine', 'Law', 'Business', 'Arts']
    const data: any[] = []
    for (let i = 0; i < rows; i++) {
      data.push({
        student_id: `STU${String(i + 1).padStart(5, '0')}`,
        field: fields[i % fields.length],
        gpa: (Math.random() * 4).toFixed(2),
        math_score: Math.floor(Math.random() * 100),
        english_score: Math.floor(Math.random() * 100),
        research_experience: Math.floor(Math.random() * 10),
        projects: Math.floor(Math.random() * 20),
      })
    }
    return data
  },

  generateInventoryData: (rows: number = 100) => {
    const products = ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Headphones']
    const stores = ['Store A', 'Store B', 'Store C', 'Store D']
    
    const data: any[] = []
    for (let i = 0; i < rows; i++) {
      data.push({
        product: products[i % products.length],
        store: stores[i % stores.length],
        stock: Math.floor(Math.random() * 1000),
        daily_sales: Math.floor(Math.random() * 50),
        reorder_point: Math.floor(Math.random() * 200) + 100,
        velocity: (Math.random() * 10).toFixed(2),
      })
    }
    return data
  },

  generateHeritageData: (rows: number = 100) => {
    const categories = ['Pottery', 'Sculpture', 'Textile', 'Jewelry', 'Artifact']
    const conditions = ['Excellent', 'Good', 'Fair', 'Poor']
    
    const data: any[] = []
    for (let i = 0; i < rows; i++) {
      data.push({
        artifact_id: `ART${String(i + 1).padStart(5, '0')}`,
        name: `Artifact ${i + 1}`,
        category: categories[i % categories.length],
        date: `${Math.floor(Math.random() * 2000) + 1000} BC/AD`,
        condition: conditions[i % conditions.length],
        location: `Gallery ${Math.floor(Math.random() * 10) + 1}`,
        inspection_score: Math.floor(Math.random() * 100),
      })
    }
    return data
  },
}
