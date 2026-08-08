"use client"

import type { Column } from "@tanstack/react-table"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DataTableSortHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  children: React.ReactNode
  className?: string
}

export function DataTableSortHeader<TData, TValue>({
  column,
  children,
  className,
}: DataTableSortHeaderProps<TData, TValue>) {
  const isSorted = column.getIsSorted()

  const handleClick = () => {
    column.toggleSorting(isSorted === "asc")
  }

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        "group relative gap-1.5 font-normal w-full justify-start bg-transparent hover:!bg-transparent hover:!text-foreground dark:hover:!bg-transparent dark:hover:!text-foreground transition-colors",
        isSorted && "text-foreground",
        className
      )}
    >
      <span>{children}</span>

      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <AnimatePresence mode="wait">
          {isSorted === "asc" && (
            <motion.span
              key="asc"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </motion.span>
          )}
          {isSorted === "desc" && (
            <motion.span
              key="desc"
              initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          )}
          {!isSorted && (
            <motion.span
              key="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute"
            >
              <ArrowUpDown className="h-3.5 w-3.5 opacity-50 group-hover:text-foreground transition-colors duration-150" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Button>
  )
}
