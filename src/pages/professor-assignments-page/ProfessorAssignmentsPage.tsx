import React, { useEffect, useState, useCallback } from 'react'
import { Button, Space } from 'antd'
import { BrowserRouter as Router, Route, NavLink, useHistory } from 'react-router-dom'
import UploadedDiagram from 'components/uploaded-diagram/UploadedDiagram'
import PageContent from 'components/page-content/PageContent'
import { Solution } from 'interfaces/Solution'
import { getSolutions } from 'actions/diagram'
import moment from 'moment'
import SearchBox from 'components/searchbox/SearchBox'
import { PlusSquareFilled } from '@ant-design/icons'
import paths from 'paths'
import { AssignmentModel } from 'interfaces/Assignment'
import { getAssignments } from 'actions/assignments'
import Assignment from 'components/assignment/Assignment'
import ExtendedAssignment from 'components/extended-assignment/ExtendedAssignment'


export default function ProfessorAssignmentsPage(props: any) {
  const [assignments, setAssignments] = useState<AssignmentModel[]>([]);
  const updateAssignments = useCallback(() => { console.log("LALAL"); getAssignments().then(setAssignments) }, []);
  useEffect(updateAssignments, [...Object.values(props)])
  console.log(assignments)
  const history = useHistory();
  return (
    <PageContent>
      <SearchBox 
        onChange={()=>{}} 
        onButtonClick={() => { history.push(paths.EDIT_ASSIGNMENT) }} 
        buttonLabel="Create New Assignment" />
      <Space direction="vertical" size="large" className="full-width">
        {
          assignments.map((assignment) => (
            <ExtendedAssignment
              submissions={assignment.submittedSolutions || []}
              onRefreshData={updateAssignments} 
              assignment={assignment}
              />
          ))
        }
      </Space>
    </PageContent>
  )
}