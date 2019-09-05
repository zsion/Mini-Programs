Component({
  properties: {
    Power: {
      type: Boolean,
      value: '',
    },
    Name: {
      type: String,
      value: '',
    },
    Date_Start: {
      type: String,
      value: '',
    },
    Date_End: {
      type: String,
      value: '',
    },
    
  },
  data: {
    
  },
  ready: function () {
    
  },
  methods: {

    Date_Start_Change:function(e){
      this.setData({
        Date_Start: e.detail.value
      })
      this.triggerEvent('Date_Start', e.detail.value)
    },

    Date_End_Change: function (e) {
      this.setData({
        Date_End: e.detail.value
      })
      this.triggerEvent('Date_End', e.detail.value)
    },

    datepicker_reset:function(){
      this.setData({
        Date_Start: '',
        Date_End: '',
      })
      this.triggerEvent('Date_Start', '');
      this.triggerEvent('Date_End', '');
    },

  }

})

