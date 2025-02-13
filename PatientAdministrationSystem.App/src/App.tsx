import { useState } from 'react'
import './App.css'

enum Page {
  PatientSearch,
  PatientView
}

function App() {
  const [currentPage] = useState(Page.PatientSearch);

  const page =  selectPage(currentPage);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {page}
    </div>
  )
}

function selectPage(page: Page) {
  switch(page) {
    case Page.PatientSearch:
      return <div>PatientSearch</div>
    case Page.PatientView:
      return <div>PatientView</div>
    default:
      return <div>Default</div>
  }
}

export default App
