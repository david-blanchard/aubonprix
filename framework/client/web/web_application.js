var Phink = Phink || {}

Phink.Web = Phink.Web || {}

Phink.Web.Application = class _WebApplication extends Phink.Web.Object {
    constructor(domain, name, isSecured) {
        super();
        this._id = 'app' + Date.now();
        if (name === undefined) {
            name = this._id;
        }

        this._name = name;
        this.viewCollection = [];
        this.controllerCollection = [];
    }
    includeView(name) {
        include('app/controllers/' + name + '/' + name + '.js');
        var newView = Phink.MVC.View.create(this, name);
        this.addView(newView);
        return newView;
    }
    createView(name, callback) {
        var newView = Phink.MVC.View.create(this, name);
        this.addView(newView);
        
        if(typeof callback === 'function') {
            callback.call(this);
        }
        return newView;
    }
    createController(viewName, name, callback) {
        var view = this.getViewByName(viewName);
        var newCtrl = Phink.MVC.Controller.create(view, name);
        this.addController(newCtrl);

        if(typeof callback === 'function') {
            callback.call(this);
        }
        return newCtrl;
    }
    getViewByName(viewName) {
        var view = null;
        for (var name in this.viewCollection) {
            if (name === viewName && this.viewCollection[name] !== null) {
                view = this.viewCollection[name];
                break;
            }
        }

        if (!(view instanceof Phink.MVC.View)) {
            throw new Error('A view with the name ' + viewName + ' does not exist');
        }

        return view;
    }
    addView(view) {
        if (view === null)
            return null;
        if (!(view instanceof Phink.MVC.View)) {
            throw new Error('This is not a view');
        }
        else {
            this.viewCollection[view.name] = view;
        }
    }
    addController(controller) {
        if (controller === undefined)
            return null;
        if (!(controller instanceof Phink.MVC.Controller)) {
            throw new Error('This is not a controller');
        }
        else {
            this.controllerCollection.push(controller);
        }
    }
    static create(domain, name, isSSL) {
        return new Phink.Web.Application(domain, name, isSSL);
    }
}
