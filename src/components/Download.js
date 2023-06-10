



export const Download = () => {
    return (
     <div>
        <div>
          <h3 className='download-page'>Export Demo</h3>
          <button>Export to Excel</button>
          <div className="list">
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>Fred</td>
              <td>Flinstone</td>
              <td>40</td>
            </tr>
            <tr>
              <td>George</td>
              <td>Jetson</td>
              <td>37</td>
            </tr>
          </table>         
          </div>
        </div>
      </div>
    )
  }