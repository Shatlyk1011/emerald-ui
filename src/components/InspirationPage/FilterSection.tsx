const categories = ['Social', 'Business', 'Finance', 'Lifestyle', 'Portfolio']
const sections = ['About', 'Features', 'How It Works', 'Hero', 'Blog']
const styles = ['Illustration', 'Minimal', 'Motion', 'Dark', 'Scroll Effects']

function FilterSection() {
  return (
    <div className='gap-6 px-2 py-12'>
      {/* Categories Column */}
      <div className='flex justify-between'>
        <div>
          <h4 className='tracking-four mb-3 text-xs font-medium uppercase opacity-60'>
            Categories
          </h4>
          <ul className='flex flex-col flex-wrap text-xl font-medium'>
            {categories.map((item) => (
              <li key={item}>
                <button className='block opacity-90 transition-colors hover:text-white'>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className='tracking-four mb-3 text-xs font-medium uppercase opacity-60'>
            Sections
          </h4>
          <ul className='flex flex-col text-xl font-medium'>
            {sections.map((item) => (
              <li key={item}>
                <button className='block opacity-90 transition-colors hover:text-white'>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className='tracking-four mb-3 text-xs font-medium uppercase opacity-60'>
            Styles
          </h4>
          <ul className='flex flex-col text-xl font-medium'>
            {styles.map((item) => (
              <li key={item}>
                <button className='block opacity-90 transition-colors hover:text-white'>
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
