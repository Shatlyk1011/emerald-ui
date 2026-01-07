const categories = ['Social', 'Business', 'Finance', 'Lifestyle', 'Portfolio']
const sections = ['About', 'Features', 'How It Works', 'Hero', 'Blog',]
const styles = ['Illustration', 'Minimal', 'Motion', 'Dark', 'Scroll Effects']

function FilterSection() {
  return (
    <div className="gap-6 py-12 px-2  ">

      {/* Categories Column */}
      <div className="flex justify-between">
        <div>
          <h4 className="text-xs font-medium opacity-60 uppercase tracking-four mb-3">
            Categories
          </h4>
          <ul className="flex flex-col flex-wrap text-xl font-medium">
            {categories.map((item) => (
              <li key={item}>
                <button
                  className=" opacity-90 hover:text-white transition-colors block"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium opacity-60 uppercase tracking-four mb-3">
            Sections
          </h4>
          <ul className="flex flex-col text-xl font-medium">
            {sections.map((item) => (
              <li key={item}>
                <button
                  className=" opacity-90 hover:text-white transition-colors block"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium opacity-60 uppercase tracking-four mb-3">
            Styles
          </h4>
          <ul className="flex flex-col text-xl font-medium">
            {styles.map((item) => (
              <li key={item}>
                <button
                  className=" opacity-90 hover:text-white transition-colors block"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default FilterSection