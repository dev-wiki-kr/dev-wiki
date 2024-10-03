import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

import { getCellsInColumn, getCellsInTable, isRowSelected, selectRow } from './table-util'
import { CellSelection } from '@tiptap/pm/tables'

export interface TableCellOptions {
  HTMLAttributes: Record<string, any>
}

export const tableCellPluginKey = new PluginKey('tableCell')

export const TableCell = Node.create<TableCellOptions>({
  name: 'tableCell',

  content: 'block+', // TODO: Do not allow table in table

  tableRole: 'cell',

  isolating: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [{ tag: 'td' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['td', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addAttributes() {
    return {
      colspan: {
        default: 1,
        parseHTML: (element) => {
          const colspan = element.getAttribute('colspan')
          const value = colspan ? parseInt(colspan, 10) : 1

          return value
        },
      },
      rowspan: {
        default: 1,
        parseHTML: (element) => {
          const rowspan = element.getAttribute('rowspan')
          const value = rowspan ? parseInt(rowspan, 10) : 1

          return value
        },
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute('colwidth')
          const value = colwidth ? [parseInt(colwidth, 10)] : null

          return value
        },
      },
      style: {
        default: null,
      },
    }
  },

  addProseMirrorPlugins() {
    const { isEditable } = this.editor

    return [
      new Plugin({
        key: tableCellPluginKey,
        state: {
          init: () => ({
            showBubbleMenu: false,
          }),
          apply(tr, value) {
            const meta = tr.getMeta(tableCellPluginKey)
            if (meta) {
              return { ...value, showBubbleMenu: meta.showBubbleMenu }
            }
            return value
          },
        },
        props: {
          decorations: (state) => {
            if (!isEditable) {
              return DecorationSet.empty
            }

            const { doc, selection } = state
            const decorations: Decoration[] = []
            const cells = getCellsInTable(selection)

            if (cells) {
              cells.forEach(({ pos }: { pos: number }, index: number) => {
                decorations.push(
                  Decoration.widget(pos + 1, () => {
                    const currentHeadPos = this.editor.view.state.selection.$head.pos
                    const currentTailPos = this.editor.view.state.selection.$from.pos
                    const parentOffset = this.editor.view.state.selection.$from.parentOffset

                    const cellSelected =
                      currentHeadPos >= pos + 2 && currentTailPos <= parentOffset + pos + 2

                    let className = 'cell-decoration'

                    if (cellSelected) {
                      className += ' visible'
                    }

                    const grip = document.createElement('button')

                    grip.className = className
                    grip.addEventListener('mousedown', (event) => {
                      event.preventDefault()
                      event.stopImmediatePropagation()

                      const transaction = this.editor.state.tr
                        .setMeta(tableCellPluginKey, {
                          showBubbleMenu: true,
                          position: pos,
                        })
                        .setSelection(new CellSelection(this.editor.state.doc.resolve(pos || 0)))

                      this.editor.view.dispatch(transaction)

                      // this.editor.view.dispatch(selectRow(index)(this.editor.state.tr))
                    })

                    return grip
                  }),
                )
              })
            }

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})
