import React from 'react'
import { useQuery } from 'react-query'

interface Group {
  sampleData: any
}

// custom hook defining the result and error types
function useGroups() {
  return useQuery<Group[], Error>(
    'list-groups',
    () => fetch(`/api/groups`).then(res => res.json()).catch(err => console.log('error:', err))
  )
}

// basics for useQuery: unique key and async function to resolve data
function basicQuery() {
  const fetchTodoList = () => console.log('fetching todos')
  const uniqueQueryId = 'todos'
  const info = useQuery(uniqueQueryId, fetchTodoList)
  console.log('info:', info)
}

// An example component using basic useQuery
function Todos() {
  const fetchTodoList = () => console.log('fetching todos')
  const uniqueQueryId = 'todos'
  const { isLoading, isError, data, error } = useQuery(uniqueQueryId, fetchTodoList)

  if(isLoading)
    return <span>Loading...</span>

  if(isError)
  // @ts-ignore
    return <span>Error: {error!.message}</span>

  return (
    <ul>
      {/* @ts-ignore */}
      {data!.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
