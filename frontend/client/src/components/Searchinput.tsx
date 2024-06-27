'use client'
import { Input } from 'antd'
import { Search } from 'lucide-react'

const { Search: AntSearch } = Input

const SearchInput = () => {
  return (
    <div className="flex items-center hidden sm:block">
      <AntSearch
        placeholder="Search"
        prefix={
          <div className="text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
        }
        className="w-full bg-primary/10 rounded-md"
      />
    </div>
  )
}

export default SearchInput