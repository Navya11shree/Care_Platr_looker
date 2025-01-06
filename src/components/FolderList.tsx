import React, { useState, useEffect } from 'react'
import { ExtensionContext } from '@looker/extension-sdk-react'
import { IFolder } from '@looker/sdk'

const FolderList: React.FC = () => {
  const [folders, setFolders] = useState<IFolder[]>([])
  const extensionContext = React.useContext(ExtensionContext)
  const sdk = extensionContext.core40SDK

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        // Fetch all accessible folders
        const result = await sdk.ok(sdk.all_folders())
        setFolders(result)
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }

    fetchFolders()
  }, [sdk])

  return (
    <div>
      <h2>Looker Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default FolderList 