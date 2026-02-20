import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { Button } from './ui/button'

interface Props {
  children: ReactNode
  containerClasses?: string
  wrapperClasses?: string
  catClasses?: string
  catGradientClasses?: string
}

const TooltipCat: FC<Props> = ({ children, containerClasses, wrapperClasses, catClasses, catGradientClasses }) => {

  return (
    <div className={cn('mouse-detector group relative w-full p-5 -m-5 max-md:m-0 max-md:p-0', containerClasses)}>
      <div className={cn('cat-light group-hover:bg-white/5 transition ease-in duration-500 absolute right-0 top-0 h-36 w-36 rounded-full blur-xl max-md:hidden', catGradientClasses)}></div>
      <div className={cn('cat scale-100 p-5 pt-0! relative', wrapperClasses)}>
        <div className={cn('w-full z-20 -mb-15 relative pointer-events-none flex justify-end ', catClasses)}>
          <div className={cn('thecat relative max-w-max')}>
            <div className='sleep-symbol group-hover:invisible absolute w-max right-30 top-2.5'>
              {Array.from({ length:3 }).map((_, index) => (
                <span className='relative inline-block opacity-100 scale-100 animate-[sleep_4s_ease-in-out_infinite]' key={index}>z</span>
              ))}
            </div>


            <svg
              width='45.952225mm'
              height='35.678726mm'
              viewBox='0 0 45.952225 35.678726'
              version='1.1'
              id='svg1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs id='defs1' />
              <g
                id='layer1'
                className='inline'
                transform='translate(-121.80376,-101.90461)'
              >
                <path
                  className="inline fill-black stroke-none stroke-[0.264583] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                  d='m 144.95859,104.74193 c 6.01466,-2.1201 14.02915,-0.85215 17.62787,2.77812 3.59872,3.63027 2.91927,7.6226 -0.0661,11.80703 -2.98542,4.18443 -9.54667,3.58363 -15.1474,3.43959 -5.60073,-0.14404 -10.30411,-0.0586 -11.67474,-3.9026 7.85671,-2.22341 3.24576,-12.00205 9.26042,-14.12214 z'
                  id='path1'
                />
                <path
                  className="inline fill-black stroke-none stroke-[0.264583] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                  d='m 156.30732,121.30486 c 0,0 -3.82398,2.52741 -4.14054,3.7997 -0.31656,1.2723 0.31438,2.18109 0.95701,2.55128 0.64264,0.3702 1.59106,-0.085 2.13559,-0.75306 0.54452,-0.6681 1.5629,-2.25488 2.47945,-3.20579 0.91654,-0.95091 2.96407,-2.74361 2.96407,-2.74361 l 0.73711,-3.60348 z'
                  id='path2'
                />
                <path
                  className="inline fill-black stroke-none stroke-[0.264583] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                  d='m 136.93356,123.08347 c 0,0 -3.20149,3.2804 -3.24123,4.59088 -0.0397,1.31049 0.60411,1.83341 1.3106,2.05901 0.7065,0.22559 1.60304,-0.55255 1.99363,-1.32084 0.39056,-0.76832 1.14875,-2.30337 2.04139,-3.29463 0.89264,-0.99126 3.37363,-3.37561 3.37363,-3.37561 l -1.30007,-3.61169 z'
                  id='path3'
                />
                <path
                  className="inline fill-black stroke-none stroke-[0.264583] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                  d='m 130.12859,121.60522 c -2.15849,1.92962 -3.38576,3.23532 -3.61836,4.5256 -0.23257,1.2903 0.0956,1.80324 0.76105,2.13059 0.66549,0.32733 1.66701,-0.31006 2.16665,-1.01233 0.49961,-0.70231 1.04598,-1.14963 2.83575,-3.05671 1.78977,-1.90708 5.91823,-3.27102 5.91823,-3.27102 l -0.75313,-3.99546 c 0,0 -5.15171,2.7497 -7.31019,4.67933 z'
                  id='path4'
                />
                <path
                  id='path5'
                  className='inline fill-black stroke-none stroke-[0.292536] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                  d='m 147.59927,113.85404 c 0.68896,4.40837 -4.04042,7.93759 -10.51533,8.9455 -6.47491,1.00791 -12.24344,-0.88717 -12.9324,-5.29555 -0.68895,-4.40838 3.44199,-9.94186 9.9169,-10.94977 6.47491,-1.0079 12.84186,2.89144 13.53083,7.29982 z'
                />
                <path
                  className="inline fill-black stroke-none stroke-[0.264583] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                  d='m 126.36446,111.82609 c 0,0 -2.37067,-6.28072 -0.86724,-7.10855 1.50342,-0.82783 5.87139,3.72617 5.87139,3.72617 z'
                  id='path6'
                />
                <path
                  className="inline fill-black stroke-none stroke-[0.264583] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                  d='m 143.50182,108.85407 c 0,0 -0.0544,-6.71302 -1.75519,-6.94283 -1.70081,-0.22982 -4.13211,5.59314 -4.13211,5.59314 z'
                  id='path7'
                />
                <g id='g25' className='inline stroke-black'>
                  <path
                    className='fill-none stroke-inherit stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    d='m 125.27102,116.06007 -2.97783,-1.05373'
                    id='path8'
                  />
                  <path
                    className='fill-none stroke-inherit stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    d='m 124.91643,116.80991 -2.84808,0.0754'
                    id='path9'
                  />
                  <path
                    className="fill-none stroke-inherit stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                    d='m 124.97798,118.00308 -2.53111,0.5156'
                    id='path10'
                  />
                </g>
                <g
                  id='g13'
                  transform='rotate(-23.188815,49.755584,71.047761)'
                  className='inline fill-none stroke-black'
                >
                  {/* usiki */}
                  <path
                    className="fill-none stroke-inherit stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                    d='m 121.77448,146.87682 3.00963,-0.95912'
                    id='path11'
                  />
                  <path
                    className="fill-none stroke-inherit stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                    d='m 122.10521,147.63749 2.84427,0.16537'
                    id='path12'
                  />
                  <path
                    className="fill-none stroke-inherit stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                    d='m 122.00599,148.82812 2.51354,0.59531'
                    id='path13'
                  />
                </g>
                <ellipse
                  className='inline fill-white stroke-none stroke-[0.56967] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]' 
                  id='path14'
                  cx='142.61723'
                  cy='108.6707'
                  rx='3.0261719'
                  ry='3.0757811'
                  transform='rotate(1.8105864)'
                />
                <ellipse
                  className='inline fill-black stroke-none stroke-[0.597086] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                  id='ellipse15'
                  cx='112.57543'
                  cy='138.29808'
                  rx='1.0380507'
                  ry='1.3097118'
                  transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                />
                <ellipse
                  className='inline fill-[#f9f9f9] stroke-none stroke-[0.184905] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                  id='ellipse16'
                  cx='112.70263'
                  cy='137.817'
                  rx='0.32146212'
                  ry='0.40558979'
                  transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                />
                <ellipse
                  className='inline fill-white stroke-none stroke-[0.56967] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                  id='ellipse17'
                  cx='135.40735'
                  cy='110.12592'
                  rx='3.0261719'
                  ry='3.0757811'
                  transform='rotate(1.8105864)'
                />
                <ellipse
                  className='inline fill-black stroke-none stroke-[0.597086] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                  id='ellipse18'
                  cx='105.22613'
                  cy='138.07497'
                  rx='1.0380507'
                  ry='1.3097118'
                  transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                />
                <ellipse
                  className='inline fill-[#f9f9f9] [fill-opacity:1] stroke-none stroke-[0.184905] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                  id='ellipse19'
                  cx='105.35332'
                  cy='137.59389'
                  rx='0.32146212'
                  ry='0.40558979'
                  transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                />
                <path
                  className='inline visible fill-black [fill-opacity:1] stroke-none stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                  d='m 163.77708,109.27292 c 4.36563,2.71198 4.26447,17.63497 3.70417,21.03437 -0.5603,3.3994 -1.86906,4.06275 -4.53099,4.49791 -5.87463,0.96037 -8.39724,-5.87134 -5.7547,-5.72161 2.64254,0.14973 3.15958,3.46446 5.95314,2.05052 2.79356,-1.41394 -1.42214,-13.46068 -1.42214,-13.46068 z'
                  id='tail'
                />
                <path
                  className="inline fill-black stroke-none stroke-[0.264583] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]"
                  d='m 159.74981,121.34445 c 0,0 -2.98896,3.47517 -2.94624,4.78555 0.0427,1.31039 0.89775,2.01247 1.61702,2.1932 0.71928,0.18075 1.50745,-0.51603 1.84897,-1.30735 0.34149,-0.79135 0.88811,-2.59584 1.51032,-3.76081 0.62219,-1.16497 2.10268,-3.44845 2.10268,-3.44845 l -0.27441,-3.66785 z'
                  id='path20'
                />
                <g id='lefteyelid' className='inline group-hover:invisible'>
                  <ellipse
                    className='fill-black [fill-opacity:1] stroke-none stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    id='path21'
                    cx='131.94429'
                    cy='114.29948'
                    rx='3.1571214'
                    ry='3.2155864'
                  />
                  <path
                    className='stroke-white [fill-opacity:1] stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    d='m 129.32504,114.80228 c 2.54908,-1.14592 4.60706,-0.65481 4.60706,-0.65481'
                    id='path22'
                  />
                </g>
                <g id='righteyelid' className='inline'>
                  <ellipse
                    className='fill-black [fill-opacity:1] stroke-none stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    id='ellipse22'
                    cx='139.07704'
                    cy='113.0834'
                    rx='3.1571214'
                    ry='3.2155864'
                  />
                  <path
                    className='fill-red-500 [fill-opacity:1] stroke-white stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    d='m 136.48089,113.70683 c 2.48528,-1.2784 4.56624,-0.89621 4.56624,-0.89621'
                    id='path23'
                  />
                </g>
                <g id='eyesdown'>
                  <ellipse
                    className='fill-white [fill-opacity:1] stroke-none stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    id='path26'
                    cx='139.12122'
                    cy='113.61373'
                    rx='1.8686198'
                    ry='2.0422525'
                  />
                  <ellipse
                    className='fill-black stroke-none stroke-[0.597086] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    id='ellipse25'
                    cx='112.24622'
                    cy='139.77037'
                    rx='1.0380507'
                    ry='1.3097118'
                    transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                  />
                  <ellipse
                    className='fill-[#f9f9f9] [fill-opacity:1] stroke-none stroke-[0.184905] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    id='ellipse26'
                    cx='112.37342'
                    cy='139.28929'
                    rx='0.32146212'
                    ry='0.40558979'
                    transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                  />
                  <ellipse
                    className='fill-white [fill-opacity:1] stroke-none stroke-[0.529167] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    id='ellipse27'
                    cx='131.994'
                    cy='114.92011'
                    rx='1.8686198'
                    ry='2.0422525'
                  />
                  <ellipse
                    className='fill-black stroke-none stroke-[0.597086] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    id='ellipse28'
                    cx='105.00267'
                    cy='139.64998'
                    rx='1.0380507'
                    ry='1.3097118'
                    transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                  />
                  <ellipse
                    className='fill-[#f9f9f9] [fill-opacity:1] stroke-none stroke-[0.184905] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:none] [stroke-opacity:0.988235]'
                    id='ellipse29'
                    cx='105.12987'
                    cy='139.1689'
                    rx='0.32146212'
                    ry='0.40558979'
                    transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className='invisible opacity-0 cat-tooltip group-hover:opacity-100 group-hover:visible group-hover:select-auto transition-all delay-[2.5s]  ease-out select-none absolute flex flex-col gap-1 z-10 text-xs text-left -top-8 right-40 py-1.5 px-3 rounded-lg rounded-br-none  font-mono font-medium tracking-two bg-card border w-72 max-w-max max-md:hidden'>
          
          <span>Meow!</span>
          <span>Like this component?</span>
          <Button asChild variant={'link'} className='max-w-max p-0 mt-1 text-xs max-h-max text-inherit'>
            <Link href="/docs/components/3d-marquee">Check it here</Link>
          </Button>
          {/* paws */}
          <span className='absolute top-[-1.5] left-4 z-[-2] text-3xl opacity-5 dark:opacity-20 '>🐾</span>
          <span className='absolute top-[-1.5] right-16 z-[-2] text-3xl opacity-5 dark:opacity-20 '>🐾</span>
          <span className='absolute top-1 right-4 z-[-2] text-3xl opacity-5 dark:opacity-20 '>🐾</span>
          <span className='absolute bottom-0 left-4 z-[-2] text-3xl opacity-5 dark:opacity-20 '>🐾</span>
          <span className='absolute bottom-2 right-7 z-[-2] text-3xl opacity-5 dark:opacity-20 '>🐾</span>

        </div>

        <div className='content'>
          {children}
        </div>
      </div>
    </div>
  )
}
export default TooltipCat
