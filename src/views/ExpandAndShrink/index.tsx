import './index.scss'
import EndLineIndent from './components/EndLineIndent';
import TagsExpand from './components/TagsExpand';

const ExpandAndShrink = () => {

  return (
    <div className="expand-and-shrink-box">
      <div className="left">
        <TagsExpand></TagsExpand>
      </div>
      <div className="right">
        <EndLineIndent></EndLineIndent>
      </div>
    </div>
  )
}

export default ExpandAndShrink