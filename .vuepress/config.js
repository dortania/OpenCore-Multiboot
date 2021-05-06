const {
    description
} = require('../package')

module.exports = {
    title: 'OpenCore Multiboot',
    head: [
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ["link", {
            rel: "'stylesheet",
            href: "/styles/website.css"
        },]
    ],
    base: '/OpenCore-Multiboot/',

	markdown: {
		extendMarkdown: md => {
			md.use(require('markdown-it-multimd-table'), {
				rowspan: true,
			});
		}
	},
    theme: 'vuepress-theme-succinct',
    globalUIComponents: [
        'ThemeManager'
    ],

    themeConfig: {
        lastUpdated: true,
        repo: 'https://github.com/dortania/OpenCore-Multiboot',
		editLinks: true,
		editLinkText: 'Help us improve this page!',
        logo: 'homepage.png',
        nav: [{
            text: 'Dortania Guides',
            ariaLabel: 'Language Menu',
            items: [{
                text: 'Home Site',
                link: 'https://dortania.github.io/'
            },
            {
                text: 'OpenCore Install Guide',
                link: 'https://dortania.github.io/OpenCore-Install-Guide/'
            },
            {
                text: 'OpenCore Post-Install',
                link: 'https://dortania.github.io/OpenCore-Post-Install/'
            },
            {
                text: 'Wireless Buyers Guide',
                link: 'https://dortania.github.io/Wireless-Buyers-Guide/'
            },
            {
                text: 'GPU Buyers Guide',
                link: 'https://dortania.github.io/GPU-Buyers-Guide/'
            },
            {
                text: 'Anti Buyers Guide',
                link: 'https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/'
            }
            ]
        },
            /*
              {
                text: 'Github',
                link: 'https://github.com/dortania/OpenCore-Install-Guide'
              }
            */
        ],
        sidebar: [{
	            title: 'Multiboot with OpenCore',
                collapsable: false,
                sidebarDepth: 0,
                children: [
                    '',
                ]
	        },
		{
            title: 'For experienced users who already dealt with multibooting',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['QUICK', 'Quick! I know what do, just tell me already HOW'],
            ]

        },
		{
            title: 'Introduction to multi-booting',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['/Intro/Def', 'What is it?'],
				['/Intro/Booting-part', 'UEFI? Legacy? CSM? What?'],
            ]

        },
		{
            title: 'UEFI Multibooting',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['/empty/', 'Empty Disk(s)'],
				{
            	collapsable: false,
            	sidebarDepth: 1,
	            children: [
	                ['/empty/samedisk', 'One disk - multiple OSes'],
					['/empty/diffdisk', 'Multiple disks - multiple OSes'],
	            ]
				},
				['/exist/', 'Existing Filled Disk(s)'],
				{
            	collapsable: false,
            	sidebarDepth: 1,
	            children: [
	                ['/exist/data', 'On a filled non-OS related disk (Data disk)'],
					['/exist/os', 'On a filled OS related disk (Windows/Linux)'],
	            ]
				},
            ]

        },
        {
            title: 'Troubleshooting',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['troubleshooting', 'Troubleshooting'],
            ]

        },
		{
            title: 'OpenCore configuration',
            collapsable: false,
            sidebarDepth: 1,
            children: [
				['/oc/linux', 'For Linux booting'],
				['/oc/duet', 'Installing OpenCore on a legacy system'],
				['https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap.html', 'Using LauncherOption'],
				['https://dortania.github.io/OpenCore-Post-Install/multiboot/bootcamp.html', 'BootCamp installation'],
            ]

        },
		{
            title: 'Windows 10 manual and automatic Installation',
            collapsable: false,
            sidebarDepth: 1,
            children: [
				['Win', 'Windows 10 manual and automatic Installation'],
            ]

        },
    	],
    },
    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        'vuepress-plugin-smooth-scroll',
        ['vuepress-plugin-medium-zoom',
            {
                selector: "img",
                options: {
                    background: 'var(--bodyBgColor)'
                }
            }],
    ]
}
