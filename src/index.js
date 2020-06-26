// @ts-check
const { createElement: h } = X;

/**
 * @type {X.ReactiveList<string>}
 */
const $data = X.toReactive([]);
const $ground = X.toReactive('0');
const $ceiling = X.toReactive('100');
const $fraction = X.toReactive('0');
const $count = X.toReactive('10');

const $step = $fraction.map(x => 0.1 ** (+x));

const LABEL_CLASS = X.createClass({
    display: 'inline-block',
    width: '8em',
    textAlign: 'right',
});

/**
 * @param {string} target
 * @param {string} text
 */
const Label = (target, text) => (
    h('label', {
        class: LABEL_CLASS,
        for: target,
    },
        text,
    )
);


const TABLE_ROW_CLASS = X.createClass({
    width: '18em',
    textAlign: 'right',
    whiteSpace: 'nowrap',
});

const INDEX_CLASS = X.createClass({
    display: 'inline-block',
    marginRight: '.5em',
    textAlign: 'left',
});

/**
 * @type {X.ReactiveListMapper<string,Node>}
 */
const DataRow = (number, $i) => (
    h('tr', {
        class: TABLE_ROW_CLASS,
    },
        h('td', {
            class: INDEX_CLASS,
        },
            '(No.',
            $i.map(i => i + 1),
            ')',
        ),
        h('td', null, number,),
    )
);

document.body.appendChild(
    h('div', {
        id: 'app',
        style: {
            padding: '2em 0',
            textAlign: 'center',
        },
    },
        h('h1', {
            style: {
                fontSize: '2em',
            },
        },
            D.Highlight(null, 'Data Mocker'),
        ),
        h('form', {
            action: 'javascript:;',
            listeners: {
                submit() {
                    const ground = +$ground.current;
                    const ceiling = +$ceiling.current;
                    const fraction = +$fraction.current;
                    const count = +$count.current;
                    const delta = ceiling - ground;
                    $data.setSync(
                        Array.from(
                            { length: count },
                            () => (delta * Math.random() + ground).toFixed(fraction)
                        )
                    );
                },
            },
        },
            D.Section(null,
                Label('ground', '下界(ground)'),
                D.TextInput({
                    id: 'ground',
                    type: 'number',
                    bind: $ground,
                    step: $step,
                }),
                h('br'),
                Label('ceiling', '上界(ceiling)'),
                D.TextInput({
                    id: 'ceiling',
                    type: 'number',
                    bind: $ceiling,
                    step: $step,
                }),
                h('br'),
                Label('fraction', '小数(fraction)'),
                D.TextInput({
                    id: 'fraction',
                    type: 'number',
                    bind: $fraction,
                    min: '0',
                    max: '10',
                    step: '1',
                }),
                h('br'),
                Label('count', '个数(count)'),
                D.TextInput({
                    id: 'count',
                    type: 'number',
                    bind: $count,
                    min: '0',
                    max: '666',
                    step: '1',
                }),
            ),
            D.Button({
                style: {
                    marginTop: '1em',
                },
            }, '生成数据(generate data)'),
        ),
        $data.toElement('table', {
            style: {
                margin: '1em auto',
            },
        },
            DataRow
        ),
        D.Section(null,
            D.Link({
                href: 'https://github.com/huang2002/mock',
            },
                '(github)'
            ),
        ),
    )
);
