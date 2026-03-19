import { joinSegments, pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const iconSrc = joinSegments(baseDir, "static/icon.png")
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} class="page-title-link">
        <img
          src={iconSrc}
          alt=""
          class="page-title-icon"
          loading="lazy"
        />
        <span>{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title-link {
  display: inline-block;
}

.page-title-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  object-fit: cover;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.6rem;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor