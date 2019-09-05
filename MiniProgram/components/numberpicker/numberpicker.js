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
    Number_Start: {
      type: String,
      value: '',
    },
    Number_End: {
      type: String,
      value: '',
    },
    
  },
  data: {
    
  },
  ready: function () {
    
  },
  methods: {

    Input_Number_Start:function(e){
      this.setData({
        Number_Start: e.detail.value
      })
      this.triggerEvent('Number_Start', e.detail.value)
    },

    Input_Number_End: function (e) {
      this.setData({
        Number_End: e.detail.value
      })
      this.triggerEvent('Number_End', e.detail.value)
    },

    numberpicker_reset:function(){
      this.setData({
        Number_Start: '',
        Number_End: '',
      })
      this.triggerEvent('Number_Start', '');
      this.triggerEvent('Number_End', '');
    },

  }

})

