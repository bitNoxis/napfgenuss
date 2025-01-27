import type { RemarkPlugin } from '@astrojs/markdown-remark';
import type { RehypePlugin } from '@astrojs/markdown-remark';
import type { Root as MdastRoot } from 'mdast';
import type { Root as HastRoot, Element, Properties } from 'hast';
import type { VFile } from 'vfile';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

interface AstroData {
  astro?: {
    frontmatter: Record<string, unknown>;
  };
}

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
  return function (tree: MdastRoot, file: VFile & { data: AstroData }) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    if (!file.data.astro) {
      file.data.astro = { frontmatter: {} };
    }

    file.data.astro.frontmatter.readingTime = readingTime;
  };
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return function (tree: HastRoot) {
    if (!tree.children) return;

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i] as Element;

      if (child.type === 'element' && child.tagName === 'table') {
        tree.children[i] = {
          type: 'element',
          tagName: 'div',
          properties: {
            style: 'overflow:auto'
          } as Properties,
          children: [child],
        } as Element;

        i++;
      }
    }
  };
};

export const lazyImagesRehypePlugin: RehypePlugin = () => {
  return function (tree: HastRoot) {
    if (!tree.children) return;

    visit(tree, 'element', function (node: Element) {
      if (node.tagName === 'img') {
        if (!node.properties) {
          node.properties = {};
        }
        node.properties.loading = 'lazy';
      }
    });
  };
};
