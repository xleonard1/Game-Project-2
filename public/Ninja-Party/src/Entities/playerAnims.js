
export default (anims) => {
    //Animate ninja1 while idle
    anims.create({
        key: 'ninja1_idle',
        frames: [
            { key: 'ninja1_idle1', frame: null },
            { key: 'ninja1_idle2', frame: null },
            { key: 'ninja1_idle3', frame: null },
            { key: 'ninja1_idle4', frame: null },
            { key: 'ninja1_idle5', frame: null }
        ],
        frameRate: 8,
        repeat: -1
    });

    //Animate ninja1 while running
    anims.create({
        key: 'ninja1_run',
        frames: [
            { key: 'ninja1_run1', frame: null },
            { key: 'ninja1_run2', frame: null },
            { key: 'ninja1_run3', frame: null },
            { key: 'ninja1_run4', frame: null },
            { key: 'ninja1_run5', frame: null },
            { key: 'ninja1_run6', frame: null },
            { key: 'ninja1_run7', frame: null },
            { key: 'ninja1_run8', frame: null }
        ],
        frameRate: 8,
        repeat: -1
    })

    //Animate ninja1 while jumping
    anims.create({
        key: 'ninja1_jump',
        frames: [
            { key: 'ninja1_jump1', frame: null },
            { key: 'ninja1_jump2', frame: null },
            { key: 'ninja1_jump3', frame: null }
        ],
        frameRate: 2,
        repeat: 1
    });

    //Animate ninja while attacking 
    anims.create({
        key: 'ninja1_attack',
        frames: [
            { key: 'ninja1_attack1', frame: null },
            { key: 'ninja1_attack2', frame: null },
            { key: 'ninja1_attack3', frame: null },
            { key: 'ninja1_attack4', frame: null },
            { key: 'ninja1_attack5', frame: null },
            { key: 'ninja1_attack6', frame: null }
        ],
        frameRate: 8,
        repeat: -1

    });

    //Sword animation during attack
    anims.create({
        key: 'ninja1_sword',
        frames: [
            { key: 'ninja1_sword1', frame: null },
            { key: 'ninja1_sword2', frame: null },
            { key: 'ninja1_sword3', frame: null },
            { key: 'ninja1_sword4', frame: null },
            { key: 'ninja1_sword5', frame: null },
            { key: 'ninja1_sword6', frame: null }
        ],
        frameRate: 8,
        repeat: -1
    });
}
